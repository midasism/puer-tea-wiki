'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import * as d3 from 'd3';
import type { HierarchyPointNode } from 'd3';
import { originTreeData } from './data';
import type { GeoType, OriginNode } from './types';
import styles from './OriginTree.module.css';

interface D3Node extends d3.HierarchyNode<OriginNode> {
  id: number;
  x0?: number;
  y0?: number;
  _children?: D3Node[] | null;
  children: D3Node[] | null;
}

interface OriginTreeProps {
  onLeafClick?: (name: string, type: GeoType) => void;
  initialDepth?: number;
  height?: string;
  isDark?: boolean;
}

type NodeStyle = {
  r: number; fill: string; stroke: string; strokeW: number;
  textColor: string; fontSize: string; glow?: boolean;
};

function getNodeStyles(dark: boolean): Record<string, NodeStyle> {
  if (dark) return {
    root:   { r: 20, fill: '#c9a052', stroke: '#e8c97a', strokeW: 2.5, textColor: '#1c1510', fontSize: '1rem', glow: true },
    region: { r: 16, fill: '#132010', stroke: '#2d5030', strokeW: 1.5, textColor: '#8ec87a', fontSize: '1rem' },
    range:  { r: 11, fill: '#1e1408', stroke: '#7a4a1a', strokeW: 1.2, textColor: '#c89050', fontSize: '.92rem' },
    '山':   { r: 8,  fill: '#0e180a', stroke: '#3a6028', strokeW: 1,   textColor: '#7ab060', fontSize: '.85rem' },
    '寨':   { r: 8,  fill: '#180c04', stroke: '#8a5020', strokeW: 1,   textColor: '#d09050', fontSize: '.85rem' },
    '地':   { r: 6,  fill: '#12100a', stroke: '#604830', strokeW: 0.8, textColor: '#907850', fontSize: '.8rem' },
    '梁':   { r: 6,  fill: '#12100a', stroke: '#504020', strokeW: 0.8, textColor: '#807040', fontSize: '.8rem' },
  };
  return {
    root:   { r: 20, fill: '#c9a052', stroke: '#a88530', strokeW: 2.5, textColor: '#fff', fontSize: '1rem', glow: true },
    region: { r: 16, fill: '#e8f5e0', stroke: '#4a7a2e', strokeW: 1.5, textColor: '#2d5030', fontSize: '1rem' },
    range:  { r: 11, fill: '#fdf3e0', stroke: '#b08030', strokeW: 1.2, textColor: '#7a4a1a', fontSize: '.92rem' },
    '山':   { r: 8,  fill: '#eaf5e4', stroke: '#5a9838', strokeW: 1,   textColor: '#3a6028', fontSize: '.85rem' },
    '寨':   { r: 8,  fill: '#fdf0e0', stroke: '#b07030', strokeW: 1,   textColor: '#8a5020', fontSize: '.85rem' },
    '地':   { r: 6,  fill: '#f5f0e8', stroke: '#a08060', strokeW: 0.8, textColor: '#6a5838', fontSize: '.8rem' },
    '梁':   { r: 6,  fill: '#f5f0e8', stroke: '#908060', strokeW: 0.8, textColor: '#6a5838', fontSize: '.8rem' },
  };
}

function getLinkColors(dark: boolean): Record<number, string> {
  if (dark) return {
    1: 'rgba(201,160,82,.3)',
    2: 'rgba(130,80,30,.35)',
    3: 'rgba(80,60,30,.3)',
  };
  return {
    1: 'rgba(160,120,50,.35)',
    2: 'rgba(130,90,40,.25)',
    3: 'rgba(100,80,50,.2)',
  };
}

const TYPE_LABEL: Record<string, string> = {
  root: '根节点', region: '产区', range: '山系 · 片区',
  '山': '山', '寨': '村寨', '地': '地块', '梁': '地块 · 山脊',
};

const LEAF_TYPES: GeoType[] = ['山', '寨', '地', '梁'];

function verticalLinkPath(s: { x: number; y: number }, t: { x: number; y: number }) {
  const my = (s.y + t.y) / 2;
  return `M${s.x},${s.y} C${s.x},${my} ${t.x},${my} ${t.x},${t.y}`;
}

function collapseAll(d: D3Node) {
  if (d.children) { d._children = d.children; d.children = null; }
  if (d._children) d._children.forEach(collapseAll);
}

function expandAll(d: D3Node) {
  if (d._children) { d.children = d._children; d._children = null; }
  if (d.children) d.children.forEach(expandAll);
}

function expandToDepth(d: D3Node, depth: number) {
  collapseAll(d);
  function go(node: D3Node, cur: number) {
    if (cur < depth) {
      if (node._children) { node.children = node._children; node._children = null; }
      if (node.children) node.children.forEach(c => go(c, cur + 1));
    }
  }
  go(d, 0);
}

function countAllNodes(d: D3Node): number {
  let count = 1;
  const children = d.children || d._children;
  if (children) children.forEach(c => { count += countAllNodes(c); });
  return count;
}

function getTreeBounds(root: D3Node): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  root.descendants().forEach((d) => {
    const pt = d as unknown as HierarchyPointNode<OriginNode>;
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;
  });
  return { minX, maxX, minY, maxY };
}

/* ── Tooltip Portal ── */
function TooltipPortal({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(
    <div className={isDark ? styles.dark : styles.light}>{children}</div>,
    document.body,
  );
}

export function OriginTree({ onLeafClick, initialDepth = 2, height, isDark = true }: OriginTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  const updateFnRef = useRef<((src: D3Node) => void) | null>(null);
  const rootRef = useRef<D3Node | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;
  const onLeafClickRef = useRef(onLeafClick);
  onLeafClickRef.current = onLeafClick;

  const handleExpandAll = useCallback(() => {
    if (rootRef.current && updateFnRef.current) {
      expandAll(rootRef.current);
      updateFnRef.current(rootRef.current);
    }
  }, []);

  const handleCollapseAll = useCallback(() => {
    if (rootRef.current && updateFnRef.current) {
      collapseAll(rootRef.current);
      updateFnRef.current(rootRef.current);
    }
  }, []);

  const handleExpandL1 = useCallback(() => {
    if (rootRef.current && updateFnRef.current) {
      expandToDepth(rootRef.current, 1);
      updateFnRef.current(rootRef.current);
    }
  }, []);

  const handleExpandL2 = useCallback(() => {
    if (rootRef.current && updateFnRef.current) {
      expandToDepth(rootRef.current, 2);
      updateFnRef.current(rootRef.current);
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(300)
        .call(zoomRef.current.scaleBy as never, 1.3);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(300)
        .call(zoomRef.current.scaleBy as never, 0.77);
    }
  }, []);

  const handleResetView = useCallback(() => {
    if (!svgRef.current || !containerRef.current || !zoomRef.current) return;
    const W = containerRef.current.clientWidth;
    d3.select(svgRef.current).transition().duration(600).ease(d3.easeCubicOut)
      .call(
        zoomRef.current.transform as never,
        d3.zoomIdentity.translate(Math.round(W / 2), 60)
      );
  }, []);

  // ── Build tree once ──
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const svgEl = svgRef.current;
    let W = container.clientWidth;
    let H = container.clientHeight;

    const dark = isDarkRef.current;
    const NODE_STYLES = getNodeStyles(dark);
    const LINK_COLORS = getLinkColors(dark);
    function sty(d: D3Node) {
      return NODE_STYLES[d.data.type] || NODE_STYLES['地'];
    }

    const svg = d3.select(svgEl)
      .attr('width', W)
      .attr('height', H);

    svg.selectAll('*').remove();

    const bgColor = dark ? '#1c1510' : '#faf5ec';
    const glowColor = dark ? 'rgba(44,74,34,.18)' : 'rgba(160,130,60,.06)';

    svg.append('rect').attr('class', 'bg-solid').attr('width', W).attr('height', H).attr('fill', bgColor)
      .style('pointer-events', 'none');

    const bgGrad = svg.append('defs').append('radialGradient')
      .attr('id', 'bgGlow')
      .attr('cx', '50%').attr('cy', '30%');
    bgGrad.append('stop').attr('offset', '0%').attr('stop-color', glowColor);
    bgGrad.append('stop').attr('offset', '100%').attr('stop-color', 'transparent');
    svg.append('rect').attr('class', 'bg-glow').attr('width', W).attr('height', H).attr('fill', 'url(#bgGlow)')
      .style('pointer-events', 'none');

    const g = svg.append('g').attr('class', 'tree-root');

    const PAD = 600;
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.25, 3])
      .translateExtent([[-W * 2 - PAD, -H * 4 - PAD], [W * 3 + PAD, H * 8 + PAD]])
      .filter((event: Event) => {
        if (event.type === 'wheel') {
          return (event as WheelEvent).ctrlKey || (event as WheelEvent).metaKey;
        }
        return !event.type.startsWith('touch') || (event as TouchEvent).touches?.length >= 2;
      })
      .on('zoom', e => g.attr('transform', e.transform));

    zoomRef.current = zoom;

    svg.call(zoom).call(
      zoom.transform,
      d3.zoomIdentity.translate(Math.round(W / 2), 60)
    );

    const treeLayout = d3.tree<OriginNode>()
      .nodeSize([120, 160])
      .separation((a, b) => a.parent === b.parent ? 1 : 1.3);

    let nodeId = 0;
    const root = d3.hierarchy(originTreeData) as D3Node;

    root.each((d: D3Node) => {
      d.id = ++nodeId;
      if (d.data.init === false && d.children) {
        d._children = d.children;
        d.children = null;
      }
    });

    if (initialDepth < 99) {
      expandToDepth(root, initialDepth);
    }

    rootRef.current = root;

    function showTip(e: MouseEvent, d: D3Node) {
      const tip = tooltipRef.current;
      if (!tip) return;

      const isLeaf = LEAF_TYPES.includes(d.data.type as GeoType);
      tip.setAttribute('data-leaf', isLeaf ? 'true' : 'false');

      const ttType = tip.querySelector('[data-tt="type"]') as HTMLElement;
      const ttName = tip.querySelector('[data-tt="name"]') as HTMLElement;
      const ttDesc = tip.querySelector('[data-tt="desc"]') as HTMLElement;
      const ttTags = tip.querySelector('[data-tt="tags"]') as HTMLElement;
      const ttChildren = tip.querySelector('[data-tt="children"]') as HTMLElement;

      if (ttType) ttType.textContent = TYPE_LABEL[d.data.type] || d.data.type;
      if (ttName) ttName.textContent = d.data.name;
      if (ttDesc) ttDesc.textContent = d.data.desc || '';
      if (ttTags) {
        ttTags.innerHTML = (d.data.tags || []).map(t =>
          `<span class="${styles.tooltipTag}">${t}</span>`).join('');
      }

      if (ttChildren) {
        const childCount = (d.children || d._children || []).length;
        if (childCount > 0) {
          const collapsed = !!d._children;
          ttChildren.textContent = `${collapsed ? '▶ 已折叠' : '▼ 展开中'}  下含 ${childCount} 个子节点`;
          ttChildren.style.display = '';
        } else {
          ttChildren.style.display = 'none';
        }
      }

      moveTip(e);
      tip.classList.add(styles.tooltipVisible);
    }

    function moveTip(e: MouseEvent) {
      const tip = tooltipRef.current;
      if (!tip) return;

      tip.style.visibility = 'hidden';
      tip.style.display = 'block';
      const tipW = tip.offsetWidth;
      const tipH = tip.offsetHeight;
      tip.style.visibility = '';
      tip.style.display = '';

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let x = e.clientX + 18;
      let y = e.clientY + 14;
      if (x + tipW > vw - 16) x = e.clientX - tipW - 14;
      if (y + tipH > vh - 16) y = e.clientY - tipH - 14;
      if (x < 8) x = 8;
      if (y < 8) y = 8;
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
    }

    function hideTip() {
      tooltipRef.current?.classList.remove(styles.tooltipVisible);
    }

    function update(src: D3Node) {
      const curDark = isDarkRef.current;
      const curNodeStyles = getNodeStyles(curDark);
      const curLinkColors = getLinkColors(curDark);
      function curSty(d: D3Node) {
        return curNodeStyles[d.data.type] || curNodeStyles['地'];
      }

      treeLayout(root as unknown as d3.HierarchyNode<OriginNode>);
      const nodes = root.descendants() as D3Node[];
      const links = (root.descendants() as D3Node[]).slice(1);

      if (countRef.current) {
        const totalNodes = countAllNodes(root);
        countRef.current.textContent = `可见 ${nodes.length} · 总 ${totalNodes} 节点`;
      }

      const bounds = getTreeBounds(root);
      const tw = Math.max(bounds.maxX - bounds.minX, W);
      const th = Math.max(bounds.maxY - bounds.minY, H);
      zoom.translateExtent([
        [bounds.minX - tw - PAD, bounds.minY - th - PAD],
        [bounds.maxX + tw + PAD, bounds.maxY + th + PAD]
      ]);

      const link = g.selectAll<SVGPathElement, D3Node>('path.link')
        .data(links, (d: D3Node) => d.id);

      const srcPt = src as unknown as HierarchyPointNode<OriginNode>;
      const srcPos = { x: src.x0 ?? srcPt.x, y: src.y0 ?? srcPt.y };

      link.enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('d', () => verticalLinkPath(srcPos, srcPos))
        .attr('stroke', d => curLinkColors[d.depth] || curLinkColors[3])
        .attr('stroke-width', d => d.depth === 1 ? 1.5 : d.depth === 2 ? 1 : 0.7)
        .attr('opacity', 0)
        .merge(link)
        .transition().duration(500).ease(d3.easeCubicOut)
        .attr('d', d => {
          const parent = d.parent as unknown as HierarchyPointNode<OriginNode>;
          const child = d as unknown as HierarchyPointNode<OriginNode>;
          return verticalLinkPath(
            { x: parent.x, y: parent.y },
            { x: child.x, y: child.y }
          );
        })
        .attr('stroke', d => curLinkColors[d.depth] || curLinkColors[3])
        .attr('stroke-width', d => d.depth === 1 ? 1.5 : d.depth === 2 ? 1 : 0.7)
        .attr('opacity', 1);

      link.exit()
        .transition().duration(350)
        .attr('d', () => verticalLinkPath(
          { x: srcPt.x, y: srcPt.y },
          { x: srcPt.x, y: srcPt.y }
        ))
        .attr('opacity', 0)
        .remove();

      const node = g.selectAll<SVGGElement, D3Node>('g.node')
        .data(nodes, (d: D3Node) => d.id);

      const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${srcPos.x},${srcPos.y})`)
        .style('opacity', 0)
        .style('cursor', d => (d.children || d._children) ? 'pointer' : 'default')
        .on('click', (e: MouseEvent, d: D3Node) => {
          if (LEAF_TYPES.includes(d.data.type as GeoType) && onLeafClickRef.current) {
            onLeafClickRef.current(d.data.name, d.data.type as GeoType);
            return;
          }
          if (d.children) { d._children = d.children; d.children = null; }
          else if (d._children) { d.children = d._children; d._children = null; }
          else return;
          update(d);
        })
        .on('mouseover', (e: MouseEvent, d: D3Node) => showTip(e, d))
        .on('mousemove', (e: MouseEvent) => moveTip(e))
        .on('mouseout', () => hideTip());

      nodeEnter.filter(d => d.data.type === 'root')
        .append('circle')
        .attr('class', 'root-ring')
        .attr('r', 30)
        .attr('fill', 'none')
        .attr('stroke', curDark ? 'rgba(201,160,82,.18)' : 'rgba(160,120,50,.2)')
        .attr('stroke-width', 1);

      nodeEnter.filter(d => !!d._children)
        .append('circle')
        .attr('class', 'pulse-ring')
        .attr('r', d => curSty(d).r + 5)
        .attr('fill', 'none')
        .attr('stroke', d => curSty(d).stroke)
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.3);

      nodeEnter.append('circle')
        .attr('class', 'main-circle')
        .attr('r', d => curSty(d).r)
        .attr('fill', d => curSty(d).fill)
        .attr('stroke', d => curSty(d).stroke)
        .attr('stroke-width', d => curSty(d).strokeW);

      nodeEnter.filter(d => !!(d.children || d._children))
        .append('circle')
        .attr('class', 'toggle-dot')
        .attr('r', 2.5)
        .attr('fill', curDark ? '#c9a052' : '#8b6914')
        .attr('opacity', 0.7);

      nodeEnter.append('text')
        .attr('class', 'node-label')
        .attr('dy', d => {
          if (d.data.type === 'root') return '.35em';
          const hasKids = !!(d.children || d._children);
          return hasKids ? -(curSty(d).r + 10) + 'px' : (curSty(d).r + 16) + 'px';
        })
        .attr('text-anchor', 'middle')
        .style('font-size', d => curSty(d).fontSize)
        .style('fill', d => curSty(d).textColor)
        .style('font-family', "var(--font-ma-shan-zheng, 'Ma Shan Zheng'), serif")
        .style('pointer-events', 'none')
        .text(d => d.data.name);

      nodeEnter.filter(d => LEAF_TYPES.includes(d.data.type as GeoType))
        .append('text')
        .attr('class', 'node-tag')
        .attr('dy', d => (curSty(d).r + 28) + 'px')
        .attr('text-anchor', 'middle')
        .style('font-family', "var(--font-mono, 'JetBrains Mono'), monospace")
        .style('font-size', '.58rem')
        .style('fill', curDark ? 'rgba(201,160,82,.32)' : 'rgba(130,90,40,.35)')
        .style('letter-spacing', '.1em')
        .style('pointer-events', 'none')
        .text(d => d.data.type);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition().duration(500).ease(d3.easeCubicOut)
        .attr('transform', d => {
          const pt = d as unknown as HierarchyPointNode<OriginNode>;
          return `translate(${pt.x},${pt.y})`;
        })
        .style('opacity', 1);

      nodeUpdate.select('.toggle-dot')
        .attr('opacity', d => (d._children || d.children) ? 0.7 : 0);

      nodeUpdate.select('.pulse-ring')
        .attr('opacity', d => d._children ? 0.3 : 0);

      node.exit()
        .transition().duration(350)
        .attr('transform', `translate(${srcPt.x},${srcPt.y})`)
        .style('opacity', 0)
        .remove();

      nodes.forEach(d => {
        const pt = d as unknown as HierarchyPointNode<OriginNode>;
        d.x0 = pt.x;
        d.y0 = pt.y;
      });
    }

    updateFnRef.current = update;

    root.x0 = 0;
    root.y0 = 0;
    update(root);

    const resizeObserver = new ResizeObserver(() => {
      W = container.clientWidth;
      H = container.clientHeight;
      svg.attr('width', W).attr('height', H);
      svg.select('rect.bg-solid').attr('width', W).attr('height', H);
      svg.select('rect.bg-glow').attr('width', W).attr('height', H);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      svg.on('.zoom', null);
      svg.selectAll('*').remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDepth]);

  // ── Theme-only update: repaint colors without rebuilding tree ──
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const g = svg.select<SVGGElement>('g.tree-root');
    if (g.empty()) return;

    const NS = getNodeStyles(isDark);
    const LC = getLinkColors(isDark);

    svg.select('rect.bg-solid').attr('fill', isDark ? '#1c1510' : '#faf5ec');
    svg.select('#bgGlow stop:first-child')
      .attr('stop-color', isDark ? 'rgba(44,74,34,.18)' : 'rgba(160,130,60,.06)');

    g.selectAll<SVGPathElement, D3Node>('path.link')
      .attr('stroke', d => LC[d.depth] || LC[3]);

    g.selectAll<SVGGElement, D3Node>('g.node').each(function(d) {
      const el = d3.select(this);
      const s = NS[d.data.type] || NS['地'];
      el.select('circle.main-circle')
        .attr('fill', s.fill).attr('stroke', s.stroke).attr('stroke-width', s.strokeW);
      el.select('circle.pulse-ring').attr('stroke', s.stroke);
      el.select('circle.root-ring')
        .attr('stroke', isDark ? 'rgba(201,160,82,.18)' : 'rgba(160,120,50,.2)');
      el.select('circle.toggle-dot').attr('fill', isDark ? '#c9a052' : '#8b6914');
      el.select('text.node-label').style('fill', s.textColor);
      el.select('text.node-tag')
        .style('fill', isDark ? 'rgba(201,160,82,.32)' : 'rgba(130,90,40,.35)');
    });
  }, [isDark]);

  const themeClass = isDark ? styles.dark : styles.light;

  return (
    <div className={themeClass}>
      <div className={styles.tabBar}>
        <button className={styles.tabBtn} onClick={handleExpandAll}>全部展开</button>
        <button className={styles.tabBtn} onClick={handleCollapseAll}>全部收起</button>
        <div className={styles.tabSep} />
        <button className={styles.tabBtn} onClick={handleExpandL1}>仅展开产区</button>
        <button className={styles.tabBtn} onClick={handleExpandL2}>展开至山系</button>
        <div className={styles.nodeCount} ref={countRef}>— 节点</div>
      </div>

      <div
        ref={containerRef}
        className={styles.container}
        style={{ height: height ?? 'calc(100vh - 200px)' }}
      >
        <svg ref={svgRef} style={{ width: '100%', height: '100%', touchAction: 'none' }} />

        <div className={styles.legend}>
          <div className={styles.legendTitle}>地理类型</div>
          {[
            { label: '根节点', bg: '#c9a052', shadow: true },
            { label: '产区', bg: isDark ? '#182a18' : '#e8f5e0', border: isDark ? 'rgba(45,74,45,.8)' : '#4a7a2e' },
            { label: '山系 / 片区', bg: isDark ? '#1e1408' : '#fdf3e0', border: isDark ? 'rgba(107,66,38,.7)' : '#b08030' },
            { label: '山', bg: isDark ? '#101808' : '#eaf5e4', border: isDark ? 'rgba(60,88,40,.7)' : '#5a9838' },
            { label: '寨', bg: isDark ? '#180e04' : '#fdf0e0', border: isDark ? 'rgba(138,80,32,.7)' : '#b07030' },
            { label: '地块 / 梁', bg: isDark ? '#100c06' : '#f5f0e8', border: isDark ? 'rgba(90,58,24,.5)' : '#a08060' },
          ].map(item => (
            <div className={styles.legendItem} key={item.label}>
              <div
                className={styles.legendNode}
                style={{
                  background: item.bg,
                  ...(item.shadow ? { boxShadow: '0 0 6px rgba(201,160,82,.5)' } : {}),
                  ...(item.border ? { border: `1.5px solid ${item.border}` } : {}),
                }}
              />
              {item.label}
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={styles.ctrlBtn} onClick={handleZoomIn}>＋</button>
          <button className={styles.ctrlBtn} onClick={handleZoomOut}>－</button>
          <button className={styles.ctrlBtn} onClick={handleResetView} title="复位">⊙</button>
        </div>
      </div>

      <div className={styles.hintBar}>
        点击节点 展开/收起 · 拖拽移动 · Ctrl+滚轮缩放 · 按钮 ＋/－ 缩放
      </div>

      {/* Tooltip rendered via portal to body — avoids overflow:hidden clipping */}
      <TooltipPortal isDark={isDark}>
        <div ref={tooltipRef} className={styles.tooltip} data-leaf="false">
          <div className={styles.tooltipTop}>
            <div className={styles.tooltipType} data-tt="type" />
          </div>
          <div className={styles.tooltipBody}>
            <div className={styles.tooltipName} data-tt="name" />
            <div className={styles.tooltipDesc} data-tt="desc" />
            <div className={styles.tooltipTags} data-tt="tags" />
            <div className={styles.tooltipChildren} data-tt="children" />
          </div>
        </div>
      </TooltipPortal>
    </div>
  );
}

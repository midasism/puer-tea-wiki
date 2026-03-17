import type { OriginNode } from './types';

export const originTreeData: OriginNode = {
  name: "原产地体系",
  type: "root",
  desc: "云南普洱茶四大核心产区的完整地理层级",
  children: [
    {
      name: "版纳茶区",
      type: "region",
      desc: "西双版纳州，最核心产区，名山最为集中",
      tags: ["核心产区", "名山最多", "勐海·勐腊"],
      init: true,
      children: [
        {
          name: "勐海片区",
          type: "range",
          desc: "以苦底强劲、山野气息著称，老班章为王",
          init: true,
          children: [
            { name: "老班章", type: "寨", desc: "「茶王」称号，苦底强劲，回甘迅猛持久，内质极丰富，为当代普洱价值标杆", tags: ["茶王", "苦底", "强劲", "布朗族"] },
            { name: "老曼峨", type: "寨", desc: "苦茶代表，苦底极重而后化甜，布朗族历史古寨，别有特色", tags: ["苦茶", "布朗族"] },
            { name: "贺开", type: "山", desc: "连片千亩古茶园，口感柔和甘甜，山野气息足，性价比相对较高", tags: ["古茶园", "甘甜"] },
            { name: "班盆", type: "寨", desc: "与老班章毗邻，风格相近，苦涩转化快，野韵足" },
            { name: "布朗山", type: "山", desc: "布朗山乡整体茶区，苦底茶代表产区，古树资源丰富" },
          ]
        },
        {
          name: "勐腊片区",
          type: "range",
          desc: "易武镇为核心，柔美花蜜风格，历史上的贡茶重地",
          init: false,
          children: [
            { name: "易武正山", type: "山", desc: "柔滑细腻，蜜香花香，是「柔美派」代表，历史上为贡茶主产区", tags: ["贡茶", "柔美", "花蜜香"] },
            { name: "刮风寨", type: "寨", desc: "深入原始森林，野韵十足，山野气息浓郁，石头寨、茶王树等地块极为珍稀", tags: ["原始森林", "野韵"] },
            { name: "薄荷塘", type: "地", desc: "极稀缺地块，清凉薄荷感闻名于世，产量极低，价格顶级", tags: ["稀缺", "清凉感", "地块"] },
            { name: "弯弓", type: "地", desc: "易武深山地块，量极少，柔中带劲，近年备受追捧", tags: ["稀缺", "地块"] },
            { name: "麻黑", type: "寨", desc: "易武核心寨子，蜜香花香，是易武茶中产量稍大的代表" },
          ]
        },
        {
          name: "景洪片区",
          type: "range",
          desc: "南糯山、勐宋一带，古茶树资源丰富",
          init: false,
          children: [
            { name: "南糯山", type: "山", desc: "茶树栽培历史悠久，花果香，甜润，有「800年栽培型茶王树」", tags: ["历史悠久", "花果香"] },
            { name: "勐宋", type: "山", desc: "靠近临沧边界，清新高扬，苦甜均衡，那卡是其代表寨" },
            { name: "帕沙", type: "寨", desc: "南糯山旁，古树保存完好，苦涩均衡，回甘持久" },
          ]
        }
      ]
    },
    {
      name: "临沧茶区",
      type: "region",
      desc: "以冰岛、昔归为代表，近年声名大噪，甜美醇厚",
      tags: ["冰岛", "昔归", "甜美"],
      init: true,
      children: [
        {
          name: "双江县",
          type: "range",
          desc: "勐库茶区所在地，冰岛村即在此县境内",
          init: true,
          children: [
            { name: "冰岛老寨", type: "寨", desc: "甜韵蜜香，口感极柔，是当代「甜美派」标杆，冰岛五寨之首", tags: ["茶后", "甜美", "蜜香", "极柔"] },
            { name: "地界", type: "寨", desc: "冰岛五寨之一，与老寨近邻，风格相近，价格略低", tags: ["冰岛五寨"] },
            { name: "坝歪", type: "寨", desc: "冰岛五寨之一，海拔较高，清香型，甜度稍低于老寨", tags: ["冰岛五寨", "高海拔"] },
            { name: "南迫", type: "寨", desc: "冰岛五寨之一，甜而带花香，适口性好", tags: ["冰岛五寨"] },
            { name: "糯伍", type: "寨", desc: "冰岛五寨之一，相对最凉，茶质清爽", tags: ["冰岛五寨"] },
          ]
        },
        {
          name: "临翔区",
          type: "range",
          desc: "忙麓山、昔归忙麓村所在",
          init: false,
          children: [
            { name: "昔归", type: "寨", desc: "忙麓山脚，茶气浓郁，醇厚内敛，回甘绵长，被誉为临沧最醇的茶", tags: ["醇厚", "茶气足", "内敛"] },
          ]
        },
        {
          name: "永德县",
          type: "range",
          desc: "大雪山、忙肺等产地，相对小众",
          init: false,
          children: [
            { name: "忙肺", type: "寨", desc: "永德代表，甜柔花香，内质丰富，近年受市场关注" },
            { name: "大雪山", type: "山", desc: "永德大雪山，海拔高，野生茶成分，茶气强劲" },
          ]
        }
      ]
    },
    {
      name: "普洱茶区",
      type: "region",
      desc: "普洱市（原思茅市），含景迈山世界遗产、无量山等",
      tags: ["景迈山", "世界遗产", "无量山"],
      init: true,
      children: [
        {
          name: "景迈山",
          type: "range",
          desc: "2023年列入世界遗产，万亩古茶园，布朗族傣族聚居地",
          init: true,
          children: [
            { name: "景迈大寨", type: "寨", desc: "花香蜜香显著，古茶园与村寨交融，最具代表性景迈茶", tags: ["世界遗产", "花蜜香"] },
            { name: "芒景村", type: "寨", desc: "布朗族村寨，是布朗族茶文化的核心传承地，古茶树连片", tags: ["布朗族", "文化传承"] },
            { name: "糯干村", type: "寨", desc: "傣族村寨，景迈山中最完整的傣族传统建筑群之一" },
            { name: "迷帝", type: "寨", desc: "景东县无量山西麓，清代贡茶产地，一度沉寂后近年因古树被重新发掘，蜜香甘柔，苦底轻", tags: ["贡茶历史", "蜜香", "重新发掘"] },
          ]
        },
        {
          name: "无量山",
          type: "range",
          desc: "景东县境内，古树资源丰富，含迷帝、黑水梁子等地块",
          init: false,
          children: [
            { name: "黑水梁子", type: "梁", desc: "特定山脊地块（梁子=山脊），野生古树为主，山野气息浓，属小众精品地块", tags: ["地块", "山脊", "野生茶"] },
            { name: "漫湾", type: "寨", desc: "无量山东坡，茶质清雅，香气扬，近年知名度逐步提升" },
            { name: "安定", type: "寨", desc: "无量山区，古树密集，甜柔回甘，较为小众" },
          ]
        },
        {
          name: "江城县",
          type: "range",
          desc: "靠近越南老挝边境，独特地理小气候",
          init: false,
          children: [
            { name: "勐烈", type: "寨", desc: "江城代表产地，三国交界地带，茶质独特，花香明显" },
          ]
        }
      ]
    },
    {
      name: "保山茶区",
      type: "region",
      desc: "保山市，相对小众，昌宁古茶树历史悠久",
      tags: ["小众", "昌宁", "古树"],
      init: false,
      children: [
        {
          name: "昌宁县",
          type: "range",
          desc: "漭水、翁堵等乡镇有优质千年古树群落",
          init: false,
          children: [
            { name: "漭水", type: "寨", desc: "高海拔产地，清爽花香，苦底轻，适合轻发酵，被称为「昌宁明珠」" },
            { name: "翁堵", type: "寨", desc: "昌宁代表，茶汤金黄，香气扬，古树茶内质饱满" },
          ]
        },
        {
          name: "腾冲市",
          type: "range",
          desc: "高黎贡山区域，边境茶区",
          init: false,
          children: [
            { name: "高黎贡山", type: "山", desc: "极高海拔，部分区域有野生古茶树，口感清雅，带高山韵味" },
          ]
        }
      ]
    }
  ]
};

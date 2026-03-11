"use client";

import {
  Clock,
  BookOpen,
  Map,
  Mountain,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "历史长河",
    description: "从东汉到当代，1700年的茶叶史诗",
    href: "/history",
    icon: Clock,
    size: "large" as const,
  },
  {
    title: "名词百科",
    description: "生茶熟茶？回甘喉韵？一看就懂",
    href: "/glossary",
    icon: BookOpen,
    size: "medium" as const,
  },
  {
    title: "产区地图",
    description: "四大产区，百座茶山的风土密码",
    href: "/regions",
    icon: Map,
    size: "medium" as const,
  },
  {
    title: "山头图鉴",
    description: "老班章到冰岛，每座山头的独特风味",
    href: "/mountains",
    icon: Mountain,
    size: "large" as const,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function BentoCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: typeof Clock;
  size: "large" | "medium";
  index: number;
}) {
  return (
    <motion.div variants={item}>
      <Link href={href} className="block h-full">
        <motion.article
          className="group relative overflow-hidden rounded-2xl bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-paper-dark"
          whileHover={{ transition: { duration: 0.2 } }}
        >
          {/* Ink wash effect on hover - scale from 0 to 100 */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-tea-green/15 transition-transform duration-500 group-hover:scale-100"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tea-green/10 text-tea-green dark:bg-tea-green/20">
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-medium text-ink dark:text-foreground">
              {title}
            </h3>
            <p className="mt-2 font-sans text-sm text-ink-muted">
              {description}
            </p>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {/* Bento layout: row1: large + medium, row2: medium + large */}
      <div className="md:col-span-2 md:row-span-1">
        <BentoCard {...cards[0]} index={0} />
      </div>
      <div className="md:col-span-1">
        <BentoCard {...cards[1]} index={1} />
      </div>
      <div className="md:col-span-1">
        <BentoCard {...cards[2]} index={2} />
      </div>
      <div className="md:col-span-2 md:row-span-1">
        <BentoCard {...cards[3]} index={3} />
      </div>
    </motion.div>
  );
}

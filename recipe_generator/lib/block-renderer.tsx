import type { Block } from "@/types";

import { Hero } from "@/components/blocks/hero";
import { Heading } from "@/components/blocks/heading";
import { CardCarousel } from "@/components/blocks/card-carousel";

const BLOCK_COMPONENTS = {
  "blocks.hero": Hero,
  "blocks.card-carousel": CardCarousel,
  "blocks.heading": Heading,
} as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function blockRenderer(block: Block, index: number) {
  const Component =
    BLOCK_COMPONENTS[block.__component as keyof typeof BLOCK_COMPONENTS];
  if (!Component) return null;

  return <Component {...(block as any)} key={index} />;
}
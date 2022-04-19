export const tools = ['axe', 'pickaxe', 'sword', 'knife'] as const;

export type Tool = typeof tools[number];

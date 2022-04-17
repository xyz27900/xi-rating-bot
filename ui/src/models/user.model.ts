import { Tool } from '@/models/tool.model';

export interface User {
  id: number;
  name: string;
  tools: Tool[];
}

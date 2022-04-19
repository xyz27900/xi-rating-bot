import { Query } from '@/models/query.model';

export type SaveArgs = {
  query: Query;
  data: {
    value: number;
  }
}

export type SaveReply = '';

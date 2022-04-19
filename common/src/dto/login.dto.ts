import { Query } from '@/models/query.model';
import { SubjectType } from '@/models/subject.model';
import { Tool } from '@/models/tool.model';
import { UserModel } from '@/models/user.model';

export type LoginArgs = {
  query: Query;
}

export type LoginReply = {
  user: UserModel;
  subjects: SubjectType[];
  tools: Tool[];
}

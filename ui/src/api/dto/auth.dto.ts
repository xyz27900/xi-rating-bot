import { LocationQuery } from 'vue-router';
import { User } from '@/models/user.model';

export type LoginArgs = LocationQuery;

export type LoginReply = User;

import { z } from 'zod';
import { Generated } from 'kysely';

export const UserSchema = z.object({
  username: z.string().min(3, '用户名太短'),
  password: z.string().min(6, '密码太短'),
});

export interface UserTable {
  id: Generated<number>;
  username: z.infer<typeof UserSchema>['username'];
  password: z.infer<typeof UserSchema>['password'];
}

export interface Database {
  users: UserTable;
}
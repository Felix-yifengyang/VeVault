import { z } from 'zod';
import { UserSchema } from '../../database/schema';

export type RegisterInput = z.infer<typeof UserSchema>;

export class RegisterDto implements RegisterInput {
  username: string;
  password: string;
}
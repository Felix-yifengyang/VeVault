import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database, UserSchema } from '../../database/schema';

@Injectable()
export class AuthService {
  // 注入我们在 DatabaseModule 里定义的 DB_CONNECTION
  constructor(@Inject('DB_CONNECTION') private db: Kysely<Database>) {}

  async register(rawData: any) {
    const result = UserSchema.safeParse(rawData);
    
    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    const { username, password } = result.data;

    // 检查用户是否已存在
    const existingUser = await this.db
      .selectFrom('users')
      .select('id')
      .where('username', '=', username)
      .executeTakeFirst();

    if (existingUser) {
      throw new BadRequestException('该用户名已被占用');
    }

    // 写入数据库 (Kysely 的语法非常直观)
    await this.db
      .insertInto('users')
      .values({
        username,
        password, // 暂不加密，先跑通流程
      })
      .execute();

    return { message: '注册成功' };
  }
}
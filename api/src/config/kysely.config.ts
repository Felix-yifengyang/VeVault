import { registerAs } from '@nestjs/config';
import { ParseJSONResultsPlugin, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';

export default registerAs('kysely', () => ({
  dialect: new MysqlDialect({
    pool: createPool({
      uri: process.env.DATABASE_URL, 
    }),
  }),
  plugins: [new ParseJSONResultsPlugin()],
}));
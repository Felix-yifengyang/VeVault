import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kysely } from 'kysely';
import { Database } from './schema';

@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('kysely');
        return new Kysely<Database>(options);
      },
    },
  ],
  exports: ['DB_CONNECTION'],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject('DB_CONNECTION') private readonly db: Kysely<Database>) {}

  async onModuleDestroy() {
    await this.db.destroy();
  }
}
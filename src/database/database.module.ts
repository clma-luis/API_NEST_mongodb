import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';

import config from 'src/config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD12345634';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${host}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, dbName } = configService.mongo;
        const uri = `${connection}://${user}:${password}@cluster0.h6s7a.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        /* ${connection}://${user}:${password}@cluster0.h6s7a.mongodb.net/test
        mongodb+srv://mernproject:Lw2csFWJkNprdBcP@cluster0.h6s7a.mongodb.net/test
        mongodb+srv://mernproject:Lw2csFWJkNprdBcP@cluster0.h6s7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
        ${connection}://${user}:${password}@cluster0.h6s7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
        */
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}

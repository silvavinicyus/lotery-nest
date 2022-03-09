import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { GamesModule } from './games/games.module';
import { BetsModule } from './bets/bets.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(),
    PermissionsModule,
    UserModule,
    AuthorizationModule,
    GamesModule,
    BetsModule,
    CartModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

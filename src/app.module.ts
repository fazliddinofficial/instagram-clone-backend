import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { config } from './common';
import { AuthModule } from './module/auth/auth.module';
import { GraphQLFormattedError } from 'graphql';
import { loggerMiddleWare } from './common/middleware';
import { PostModule } from './module/post/post.module';
import { CommentModule } from './module/comment/comment.module';
import { UploadModule } from './module/upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_DB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      path: '/api',
      introspection: true,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      
      formatError: (
        formattedError: GraphQLFormattedError,
        error: unknown,
      ): GraphQLFormattedError => {
        const originalError: any = (formattedError.extensions as any)
          ?.originalError;

        const message = Array.isArray(originalError?.message)
          ? originalError.message[0]
          : originalError?.message ||
            formattedError.message ||
            'Internal server error!';

        return {
          message,
          locations: formattedError.locations,
          path: formattedError.path,
          extensions: {
            code: formattedError.extensions?.code || 'ERROR',
          },
        };
      },

      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
        fieldMiddleware: [loggerMiddleWare],
      },
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

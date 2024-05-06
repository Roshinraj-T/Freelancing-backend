import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from './registration/registration.module';
import { UserModule } from './user/user.module';
import { WebSocketModule } from './web-socket/web-socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : ".env"
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // synchronize: false,
      // synchronize: true,
      autoLoadEntities: true,
      }),
    RegistrationModule,
    UserModule,
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Avatar } from './avatar.entity';
import { AWSService } from './aws.service';
import { AvatarService } from './avatar.service';
import { Persona } from './persona.entity';
import { OpenaiService } from './openai.service';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get('DB_CONNECTION'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Avatar, Persona]),
    HttpModule.register({
      // timeout 2 mins
      timeout: 120 * 1000,
    }),
  ],
  controllers: [PersonaController],
  providers: [AWSService, AvatarService, OpenaiService, PersonaService],
})
export class AppModule {}

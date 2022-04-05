import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PhotoController } from './photo.controller';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [...photoProviders, PhotoService],
})
export class PhotoModule {}

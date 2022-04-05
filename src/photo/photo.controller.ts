import { Controller, Get } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  get(): Promise<Photo[]> {
    return this.photoService.findAll();
  }
}

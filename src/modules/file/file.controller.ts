import {
  Controller,
  Request,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { apiBodyOptions, fileLocalOptions } from '../file-upload.utils';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(
    FileInterceptor('file', fileLocalOptions('./public/interview')),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodyOptions)
  @Post('interview')
  createInterviewFile(@UploadedFile() { mimetype, originalname, path, size }) {
    const data = {
      name: originalname,
      type: mimetype,
      path,
      size,
    };

    return this.fileService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(
    FileInterceptor('file', fileLocalOptions('./public/gallery')),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodyOptions)
  @Post('gallery')
  createGalleryFile(@UploadedFile() { mimetype, originalname, path, size }) {
    const data = {
      name: originalname,
      type: mimetype,
      path,
      size,
    };

    return this.fileService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(FileInterceptor('file', fileLocalOptions('./public/user')))
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodyOptions)
  @Post('user')
  createUserImage(@UploadedFile() { mimetype, originalname, path, size }) {
    const data = {
      name: originalname,
      type: mimetype,
      path,
      size,
    };

    return this.fileService.create(data);
  }
}

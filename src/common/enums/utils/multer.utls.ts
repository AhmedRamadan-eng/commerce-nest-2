import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
      const uniquSuffix = Date.now() + '-' + Math.round(Math.random() * 1e8);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniquSuffix}${ext}`);
    },
  }),

  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (
      file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/) ||
      ['.jpg', '.jpeg', '.png', '.pdf'].includes(
        extname(file.originalname).toLowerCase(),
      )
    ) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Unsupported file format'), false);
    }
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};
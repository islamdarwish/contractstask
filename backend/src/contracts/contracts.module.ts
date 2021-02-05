import {HttpException, HttpStatus, Module} from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import {MulterModule} from "@nestjs/platform-express";
import {PdfCreatorService} from "./services/pdf-creator.service";
const multer = require('multer');
const crypto = require("crypto");

@Module({
  controllers: [ContractsController],
  providers: [ContractsService, PdfCreatorService],
    imports: [MulterModule.register({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads')
            },
            filename: function (req, file, cb) {
                const fileName = file.originalname;
                const fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);
                cb(null, crypto.randomBytes(20).toString('hex') + '.' + fileExtension);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype !== 'application/pdf') {
                cb(new HttpException('File type is wrong', HttpStatus.FORBIDDEN), false);
            }
            else{
                cb(null, true);
            }
        },
        limits: {
            fileSize: 10000000, // max 10 mb
        },
        preservePath: true
    })]
})
export class ContractsModule {}

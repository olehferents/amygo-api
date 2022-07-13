import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AddDocumentsDto } from '../driver/dto/addDocuments.dto';
import { DocumentsStatus } from '../driver/documentStatus.enum';
import { FileUploadService } from '../file-upload';
import { MerchantService } from './merchant.service';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerMessagesEnum } from '../../constants/messagesEnum';

@Controller('merchant')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: SwaggerMessagesEnum.API_UNAUTHORIZED_RESPONSE,
})
@ApiTags('merchant')
export class MerchantController {
  constructor(
    private readonly uploadService: FileUploadService,
    private readonly merchantService: MerchantService,
  ) {}

  @Get('/profile')
  public async getUser(@Req() req, @Res() res): Promise<void> {
    try {
      const { user } = req;

      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Post('documents')
  @UseInterceptors(FilesInterceptor('documents'))
  @ApiConsumes('multipart/form-data')
  @ApiNoContentResponse({
    description: 'Congrats, you added documents',
  })
  @ApiOperation({ summary: 'Merchant adds documents...' })
  public async addDocuments(
    @Req() req,
    @Res() res,
    @UploadedFiles() documents,
    @Body() docs: AddDocumentsDto,
  ): Promise<void> {
    try {
      const { user } = req;

      documents.forEach((doc) => {
        this.uploadService.isDocumentsValid(doc);
      });

      documents.forEach((doc) => {
        doc.originalname += Date.now();
        user.documents.push(
          process.env.S3_BUCKET_URL_MERCHANT_DOCUMENTS + doc.originalname,
        );
        this.uploadService.upload(
          doc,
          process.env.S3_BUCKET_NAME_MERCHANT_DOCUMENTS,
        );
      });

      user.documentsStatus = DocumentsStatus.WAITING_FOR_CONFIRMATION;

      await this.merchantService.saveChanges(user);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }
}

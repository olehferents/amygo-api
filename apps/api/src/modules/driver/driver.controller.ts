import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DriverService } from './driver.service';
import { CarDto } from './dto/car.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload';
import { DocumentsStatus } from './documentStatus.enum';
import { AddDocumentsDto } from './dto/addDocuments.dto';
import { PreorderTripService } from '../preorder-trip/preorder-trip.service';
import { AcceptPreorderTripDto } from '../preorder-trip/dto/acceptPreorderTrip.dto';
import { EditCarDto } from './dto/edit-car.dto';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Provide valid access token' })
@ApiBadRequestResponse({ description: 'Please check schema of request' })
@ApiTags('driver')
@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly preorderTripService: PreorderTripService,
    private readonly uploadService: FileUploadService,
  ) {}
  @Get('/profile')
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  public async getUser(@Req() req, @Res() res): Promise<void> {
    try {
      const user = await this.driverService.findDriverAndCarById(req.user.id);

      if (!user) {
        throw new NotFoundException('Driver does not exist!');
      }

      delete user.password;

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
  @ApiOperation({ summary: 'Driver adds documents...' })
  public async addDocuments(
    @Req() req,
    @Res() res,
    @UploadedFiles() documents,
    @Body() docs: AddDocumentsDto,
  ): Promise<void> {
    try {
      const { user } = req;

      documents.forEach((doc) => this.uploadService.isDocumentsValid(doc));

      documents.forEach((doc) => {
        doc.originalname += Date.now();
        user.documents.push(
          process.env.S3_BUCKET_URL_DRIVER_DOCUMENTS + doc.originalname,
        );
        this.uploadService.upload(
          doc,
          process.env.S3_BUCKET_NAME_DRIVER_DOCUMENTS,
        );
      });

      user.documentsStatus = DocumentsStatus.WAITING_FOR_CONFIRMATION;

      await this.driverService.saveChanges(user);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Get('preorder-trips')
  @ApiOperation({ summary: 'Driver gets all preorder trips...' })
  @ApiOkResponse({ description: 'List of all preorder trips' })
  @ApiTags('preorder')
  public async getPreorderTrips(@Res() res) {
    try {
      const trips = await this.preorderTripService.findAllNotAcceptedPreorderTrips();
      res.json(trips);
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Put('accept-preorder-trip')
  @ApiTags('preorder')
  @ApiOperation({ summary: 'Driver offers user his service' })
  @ApiNotFoundResponse({ description: 'Trip is not found' })
  public async acceptPreorderTrip(
    @Req() req,
    @Res() res,
    @Body() trip: AcceptPreorderTripDto,
  ) {
    try {
      await this.preorderTripService.acceptPreorderTrip(
        trip.preorderTripId,
        req.user,
      );

      res.json({ message: `You offer a trip` });
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Put('cancel-preorder-trip')
  @ApiTags('preorder')
  @ApiOperation({ summary: 'Driver reject his offer or cancel agreement' })
  @ApiOkResponse({ description: 'Preorder trip is decline' })
  @ApiNotFoundResponse({ description: 'Trip is not found' })
  public async cancelPreorderTrip(
    @Req() req,
    @Res() res,
    @Body() trip: AcceptPreorderTripDto,
  ) {
    try {
      await this.preorderTripService.driverCancelPreorderTrip(
        trip.preorderTripId,
        req.user.id,
      );

      res.json({ message: 'Preorder trip is declined' });
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Post('add/car')
  @ApiConflictResponse({
    description: 'Car number already exists!',
  })
  public async createCar(@Body() carDto: CarDto, @Res() res, @Req() req) {
    try {
      await this.driverService.createCar(carDto, req.user.id);
      return res.status(HttpStatus.CREATED).json({
        message: 'Car was successfully created',
        status: 201,
      });
    } catch (err) {
      res
        .status(HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }

  @Put('edit-car')
  @ApiNoContentResponse({ description: 'You changed your car' })
  @ApiOperation({ summary: 'Edit your car properties' })
  public async editCar(@Body() carDto: EditCarDto, @Res() res, @Req() req) {
    try {
      await this.driverService.editCar(carDto, req.user);

      res
        .status(HttpStatus.OK)
        .json({ message: 'You successfully changed your car' });
    } catch (err) {
      res
        .status(err.status || HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }
}

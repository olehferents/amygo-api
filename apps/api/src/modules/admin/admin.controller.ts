import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { DocumentsStatus } from '../driver/documentStatus.enum';
import { ConfirmDocumentsDto } from './dto/confirm-documents.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminNotificationDto } from './dto/adminNotification.dto';
import { AdminService } from './admin.service';
import { MerchantService } from '../merchant/merchant.service';
import { SwaggerMessagesEnum } from '../../constants/messagesEnum';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { FoodOrderService } from '../food-order/food-order.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly foodOrderService: FoodOrderService,
    private readonly userService: UserService,
    private readonly driverService: DriverService,
    private readonly merchantService: MerchantService,
    private readonly adminService: AdminService,
  ) {}

  @Get(':role/documents-for-confirmation')
  @ApiParam({ name: 'role', enum: ['driver', 'merchant'] })
  @ApiOperation({ summary: 'Shows info about driver and documents ' })
  private async getDriversWaitingForConfirmation(
    @Res() res,
    @Param('role') role: string,
  ) {
    try {
      let employees;
      if (role === 'driver') {
        employees = await this.driverService.getDriversWaitingForConfirmation();
      }

      if (role === 'merchant') {
        employees = await this.merchantService.getMerchantsWaitingForConfirmation();
      }

      res.json(employees);
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Put(':role/confirm-documents')
  @ApiBadRequestResponse({ description: 'userId should not be empty' })
  @ApiOkResponse({ description: 'Documents confirmed!' })
  @ApiParam({ name: 'role', enum: ['driver', 'merchant'] })
  @ApiOperation({ summary: 'Make driver valid!!!' })
  private async confirmDocuments(
    @Res() res,
    @Body() confirmDocuments: ConfirmDocumentsDto,
    @Param('role') role: string,
  ) {
    try {
      let employees;
      if (role === 'driver') {
        employees = await this.driverService.findById(confirmDocuments.userId);
      }
      if (role === 'merchant') {
        employees = await this.merchantService.findById(
          confirmDocuments.userId,
        );
      }
      employees.documentsStatus = DocumentsStatus.CONFIRMED;
      employees.isVerified = true;

      if (role === 'driver') {
        await this.driverService.saveChanges(employees);
      }

      if (role === 'merchant') {
        await this.merchantService.saveChanges(employees);
      }

      res.json({ message: 'Documents confirmed!' });
    } catch (err) {
      res
        .status(err.status)
        .json({ message: err.response.message || err.message });
    }
  }

  @Post('send-to/:role')
  @ApiParam({ name: 'role', enum: ['users', 'drivers', 'merchants', 'all'] })
  @ApiOperation({
    summary: 'Send notification to users/drivers/merchants or all at once',
    description: SwaggerMessagesEnum.DESCRIBE_ADMIN_NOTIFICATIONS,
  })
  @ApiPreconditionFailedResponse({ description: 'Time should be in future' })
  @ApiOkResponse({ description: 'Notification is/(will be) send' })
  @ApiBadRequestResponse({
    description: 'Please check AdminNotificationDto schema',
  })
  private async sendToAll(
    @Res() res,
    @Body() notification: AdminNotificationDto,
    @Param('role') role: string,
  ) {
    try {
      this.adminService.adminNotification(notification, role);
      const { when } = notification;

      res.status(HttpStatus.OK).json({
        message: when
          ? `Notification is scheduled at ${when}`
          : 'Notification is send',
      });
    } catch (err) {
      res
        .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json(err.message || err);
    }
  }

  @Get('user/food-orders')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  public async showFoodOrders(@Req() req, @Res() res, @Body() userId: string) {
    try {
      const user = await this.userService.findById(userId);
      return res.status(HttpStatus.OK).json(user.foodOrder);
    } catch (err) {
      return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message || err.detail,
      });
    }
  }

  @Get('all-food-orders')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  public async showAllFoodOrders(@Req() req, @Res() res) {
    try {
      const allOrders = await this.foodOrderService.findAllOrders();
      return res.status(HttpStatus.OK).json(allOrders);
    } catch (err) {
      return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message || err.detail,
      });
    }
  }
}

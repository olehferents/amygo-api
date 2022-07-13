import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Req,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AddToCartDto } from './dto/addToCart.dto';
import { Item } from './entities/item.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  public async getUser(@Req() req, @Res() res): Promise<void> {
    console.log('is working att all???');
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    delete user.id;
    delete user.password;

    res.status(HttpStatus.OK).json(user);
  }

  @Get('/bonuses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiUnauthorizedResponse({ description: 'Provide valid access token' })
  public async getBonuses(@Req() req, @Res() res): Promise<void> {
    const bonuses = await this.usersService.findBonusById(req.user.id);
    return res.status(HttpStatus.OK).json(bonuses);
  }

  @Put('/bonuses/update/:bonuses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'bonuses' })
  public async updateBonuses(@Req() req, @Res() res, @Param() params) {
    try {
      const newBonus = await this.usersService.updateBonuses(
        req.user.id,
        params.bonuses,
      );
      return res.status(HttpStatus.OK).json(newBonus);
    } catch (err) {
      return res.status(HttpStatus.CONFLICT).json({
        message: err.message || err.detail,
      });
    }
  }

  @Put('order-food')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  public async orderFood(@Req() req, @Body() item: AddToCartDto[], @Res() res) {
    try {
      await this.usersService.orderFood(req.user.id, item);
      res.status(HttpStatus.OK);
    } catch (err) {
      res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message || err.detail,
      });
    }
  }
}

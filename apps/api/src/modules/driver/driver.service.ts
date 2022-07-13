import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDriverDto } from '../auth/signup/dto/signupDriver.dto';
import { UserDto } from '../user/dto/user.dto';
import { CarDto } from './dto/car.dto';
import { ChangeProfileDto } from '../change-profile/dto/changeProfile.dto';
import { Driver } from './entities/driver.entity';
import { Car } from './entities/car.entity';
import { DocumentsStatus } from './documentStatus.enum';
import { EditCarDto } from './dto/edit-car.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,

    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  public async findByEmail(email: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: {
        email,
      },
    });

    if (!driver) {
      if (!driver) throw new NotFoundException(`Driver ${email} not found`);
    }
    return driver;
  }

  public async findById(userId: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Driver #${userId} not found`);
    }
    return driver;
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Driver #${phoneNumber} not found`);
    }
    return driver;
  }

  async findDriverAndCarById(id: string): Promise<Driver> {
    return this.driverRepository.findOne({
      where: {
        id,
      },
      relations: ['car'],
    });
  }

  public async findVerifiedOnlineDrivers(): Promise<string[]> {
    //TODO limit by location
    const driversIds = await this.driverRepository.find({
      select: ['id'],
      where: {
        isOnline: true,
        isVerified: true,
      },
    });

    if (!driversIds.length) {
      throw new NotFoundException({ message: 'No driver offered you trip' });
    }

    return driversIds.map((driver) => driver.id);
  }

  public async createDriver(userDto: SignupDriverDto): Promise<UserDto> {
    const user = await this.driverRepository.save(userDto);
    const { password, ...rest } = user;

    return rest;
  }

  public async updateProfile(driver, userData: ChangeProfileDto) {
    await this.driverRepository.update(driver, userData);
  }

  public async saveChanges(driver) {
    await this.driverRepository.save(driver);
  }

  async changePassword(driver, newHashedPassword: string) {
    await this.driverRepository.update(driver, {
      password: newHashedPassword,
    });
  }

  public async createCar(carDto: CarDto, id: string): Promise<void> {
    const driver = await this.driverRepository.findOne({
      where: {
        id,
      },
    });
    carDto.driver = driver;
    driver.car = await this.carRepository.save(carDto);
    await this.driverRepository.save(driver);
  }

  public async findCarByDriver(driverId: string) {
    const driverData = await this.findById(driverId);
    const carData = await this.carRepository.findOne({
      where: {
        driver: driverData,
      },
      loadRelationIds: true,
    });

    return carData;
  }

  async getDriversWaitingForConfirmation() {
    const drivers = await this.driverRepository.find({
      where: {
        documentsStatus: DocumentsStatus.WAITING_FOR_CONFIRMATION,
      },
      relations: ['car'],
    });

    return drivers;
  }

  async editCar(carDto: EditCarDto, user: Driver) {
    const car = await this.findCarByDriver(user.id);

    await this.carRepository.update(car, carDto);
  }


}

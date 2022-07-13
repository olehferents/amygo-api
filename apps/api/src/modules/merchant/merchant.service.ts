import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupMerchantDto } from '../auth/signup/dto/signup.merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { ChangeProfileDto } from '../change-profile/dto/changeProfile.dto';
import { DocumentsStatus } from '../driver/documentStatus.enum';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  async createMerchant(signupMerchantDto: SignupMerchantDto) {
    const user = await this.merchantRepository.save(signupMerchantDto);
    const { password, ...rest } = user;

    return rest;
  }

  public async findById(userId: string): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!merchant) {
      throw new NotFoundException(`Merchant #${userId} not found`);
    }
    return merchant;
  }

  public async findByEmail(email: string): Promise<Merchant> {
    const merch = await this.merchantRepository.findOne({
      where: {
        email,
      },
    });

    if (!merch) {
      if (!merch) throw new NotFoundException(`Merchant ${email} not found`);
    }

    return merch;
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!merchant) {
      throw new NotFoundException(`Merchant #${phoneNumber} not found`);
    }
    return merchant;
  }

  async changePassword(merchant, newHashedPassword: string): Promise<void> {
    await this.merchantRepository.update(merchant, {
      password: newHashedPassword,
    });
  }

  public async updateProfile(
    merchant,
    userData: ChangeProfileDto,
  ): Promise<void> {
    await this.merchantRepository.update(merchant, userData);
  }

  async saveChanges(merchant): Promise<void> {
    await this.merchantRepository.save(merchant);
  }

  async getMerchantsWaitingForConfirmation(): Promise<Merchant[]> {
    return this.merchantRepository.find({
      where: {
        documentsStatus: DocumentsStatus.WAITING_FOR_CONFIRMATION,
      },
    });
  }
}

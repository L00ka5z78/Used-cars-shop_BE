import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities';
import { Repository } from 'typeorm';
import { CreateReportDto, GetEstimateDto } from './dtos';
import { User } from '../users/entities';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng -:lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat -:lat BETWEEN -5 AND 5', { lat })
      .andWhere('year -:year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  createReport(reportDto: CreateReportDto, user: User) {
    const report = this.repository.create(reportDto);
    report.user = user;
    return this.repository.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repository.findOne({
      where: { id: parseInt(id) },
    });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repository.save(report);
  }
}

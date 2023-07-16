import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos';
import { User } from '../users/entities';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}

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

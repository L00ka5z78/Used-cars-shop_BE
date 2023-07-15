import { Injectable } from '@nestjs/common';
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
}

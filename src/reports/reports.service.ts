import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}

  createReport(reportDto: CreateReportDto) {
    const report = this.repository.create(reportDto);

    return this.repository.save(report);
  }
}

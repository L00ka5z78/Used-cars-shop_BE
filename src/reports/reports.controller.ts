import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateReportDto) {
    return this.reportsService.createReport(body);
  }
}

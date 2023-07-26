import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApproveReportDto, CreateReportDto } from './dtos';
import { ReportsService } from './reports.service';
import { AuthGuard, AdminGuard } from '../guards';
import { CurrentUser } from '../users/decorators';
import { User } from '../users/entities';
import { ReportDto } from './dtos';
import { Serialize } from '../interceptors';
import { GetEstimateDto } from './dtos';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  create(
    @Body() body: CreateReportDto,
    @CurrentUser()
    user: User,
  ) {
    return this.reportsService.createReport(body, user);
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

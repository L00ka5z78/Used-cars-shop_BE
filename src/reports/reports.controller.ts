import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { ApproveReportDto, CreateReportDto } from './dtos';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards';
import { CurrentUser } from '../users/decorators';
import { User } from '../users/entities';
import { ReportDto } from './dtos';
import { Serialize } from '../interceptors';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

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
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

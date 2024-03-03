import { JwtAuthGuard } from '@guards/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TrimPipe } from '@pipes/trim.pipe';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto, GetStatisticParamsDto } from './models/invoices.dto';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UsePipes(TrimPipe)
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get('statistic')
  getStatistic(@Query() getStatisticParams: GetStatisticParamsDto) {
    return this.invoicesService.getStatistic(getStatisticParams);
  }
}

import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { TrimPipe } from '@pipes/trim.pipe';
import { ROUTES } from '@constants/routes';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './models/invoices.dto';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.INVOICES)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UsePipes(TrimPipe)
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }
}

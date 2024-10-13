import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { ClientsService } from './clients.service'
import { CreateClientDto } from './dto/create.client.dto'
import { ApiKeyGuard } from './guards/api.key.guard'

@UseGuards(ApiKeyGuard)
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number
  ) {
    return await this.clientsService.findAll(sort, limit)
  }

  @Get('gender')
  async findByGender(@Query('gender') gender: string) {
    const client = await this.clientsService.findByGender(gender)
    if (client.length == 0) {
      throw new NotFoundException('Clients not found')
    }

    return client
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientsService.findOne(id)
    if (client.length == 0) {
      throw new NotFoundException('Client not found')
    }

    return client
  }

  @Post()
  async create(@Body(ValidationPipe) input: CreateClientDto) {
    return await this.clientsService.create(input)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from '../service/authors.service';
import { CreateAuthorBody } from '../dto/create/createAuthor.body.dto';
import { UpdateAuthorBody } from '../dto/update/updateAuthor.body.dto';
import { ShowAuthorParamsDto } from '../dto/create/createAuthor.params.dto';
import { Roles } from '../../auth/decorators/roles.decoraror';
import { UserRole } from '../../users/entities/user.entity';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post()
  create(@Body() dto: CreateAuthorBody) {
    return this.authorsService.create(dto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ShowAuthorParamsDto) {
    return this.authorsService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Patch(':id')
  update(@Param() params: ShowAuthorParamsDto, @Body() dto: UpdateAuthorBody) {
    return this.authorsService.update(params.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Delete(':id')
  delete(@Param() params: ShowAuthorParamsDto) {
    return this.authorsService.delete(params.id);
  }
}

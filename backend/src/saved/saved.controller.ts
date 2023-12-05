import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';

@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Post()
  create(@Body() createSavedDto: CreateSavedDto) {
    return this.savedService.create(createSavedDto);
  }

  @Get()
  findAll(@Query('userID') userID: number) {
    return this.savedService.findAll(userID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedService.remove(+id);
  }
}

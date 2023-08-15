import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto, GetPersonasDto } from './persona.dto';
import { UniResponse } from './app.type';

@Controller('personas')
export class PersonaController {
  @Inject()
  private readonly personaService: PersonaService;

  @Get('/')
  async getPersonas(@Query() getPersonasDto: GetPersonasDto): UniResponse {
    const data = await this.personaService.getPersonas(getPersonasDto);
    return {
      status: 'success',
      data,
    };
  }

  @Post('/')
  async createPersona(@Body() createPersonaDto: CreatePersonaDto): UniResponse {
    const data = await this.personaService.createPersona(createPersonaDto);
    return {
      status: 'success',
      data,
    };
  }
}

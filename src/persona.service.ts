import { Inject, Injectable } from '@nestjs/common';
import { Persona } from './persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenaiService } from './openai.service';
import { CreatePersonaDto, GetPersonasDto } from './persona.dto';
import { generatePersonaTemplate } from './persona.template';

@Injectable()
export class PersonaService {
  @Inject()
  private readonly openaiService: OpenaiService;

  @InjectRepository(Persona)
  private readonly personaRepository: Repository<Persona>;

  async getPersonas(params: GetPersonasDto) {
    return await this.personaRepository.findBy({
      listing_id: params.listing_id,
    });
  }

  async createPersona(data: CreatePersonaDto) {
    const persona = await this.openaiService.chatgpt(
      generatePersonaTemplate(data.listing),
    );
    return await this.personaRepository.save({
      listing_id: data.listing_id,
      persona: JSON.parse(persona),
    });
  }
}

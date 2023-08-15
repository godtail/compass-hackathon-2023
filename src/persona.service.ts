import { Inject, Injectable } from '@nestjs/common';
import { Persona } from './persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenaiService } from './openai.service';
import { CreatePersonaDto, GetPersonasDto } from './persona.dto';
import { generatePersonaTemplate } from './persona.template';
import { AvatarService } from './avatar.service';

@Injectable()
export class PersonaService {
  @Inject()
  private readonly avatarService: AvatarService;

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
    const persona = JSON.parse(
      await this.openaiService.chatgpt(generatePersonaTemplate(data.listing)),
    );
    persona.avatar = await this.avatarService.getRandomAvatar(
      persona.sex,
      persona.age,
    );
    return await this.personaRepository.save({
      listing_id: data.listing_id,
      persona,
    });
  }
}

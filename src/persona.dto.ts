import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetPersonasDto {
  @ApiProperty()
  @IsNotEmpty()
  listing_id: string;
}

export class CreatePersonaDto {
  @ApiProperty()
  @IsNotEmpty()
  listing_id: string;

  @ApiProperty()
  @IsNotEmpty()
  listing: object;
}

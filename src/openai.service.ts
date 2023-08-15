import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

const CHATGPT_API = 'https://api.openai.com/v1/chat/completions';
const CHATGPT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class OpenaiService {
  @Inject()
  private readonly configService: ConfigService;

  @Inject()
  private readonly httpService: HttpService;

  async chatgpt(content: string) {
    try {
      const requestOptions = {
        url: CHATGPT_API,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.configService.get('OPENAI_KEY')}`,
        },
        data: {
          model: CHATGPT_MODEL,
          messages: [{ role: 'user', content }],
        },
      };
      const result = await lastValueFrom(
        this.httpService.request<any>(requestOptions),
      );
      return result.data?.choices?.[0]?.message?.content;
    } catch (error: any) {
      throw new BadRequestException(error.getMessage?.());
    }
  }
}

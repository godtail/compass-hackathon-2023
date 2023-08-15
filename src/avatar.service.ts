import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import qs from 'qs';
import cliProgress from 'cli-progress';
import { AWSService } from 'src/aws.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { Repository } from 'typeorm';

const AVATAR_API = 'https://api.generated.photos/api/frontend/v1/images';
const AVATAR_API_AUTH = 'API-Key Cph30qkLrdJDkjW-THCeyA';

@Injectable()
export class AvatarService {
  @Inject()
  private readonly httpService: HttpService;

  @Inject()
  private readonly awsService: AWSService;

  @InjectRepository(Avatar)
  private readonly avatarRepository: Repository<Avatar>;

  async download() {
    const progressBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic,
    );
    const ages = ['adult', 'young-adult', 'child', 'infant', 'elderly'];
    const sexes = ['male', 'female'];
    const pageSize = 30;
    progressBar.start(ages.length * sexes.length * pageSize, 0);
    for (const age of ages) {
      for (const sex of sexes) {
        try {
          const params = {
            page: 1,
            per_page: pageSize,
            age,
            sex,
          };
          const result = await lastValueFrom(
            this.httpService.get(`${AVATAR_API}?${qs.stringify(params)}`, {
              headers: {
                Authorization: AVATAR_API_AUTH,
              },
            }),
          );
          await Promise.all(
            result.data.images.map(async (image: any) => {
              const imageResult = await lastValueFrom(
                this.httpService.get(image.thumb_url, {
                  responseType: 'arraybuffer',
                }),
              );
              const base64 = `data:image/jpg;base64,${Buffer.from(
                imageResult.data,
                'binary',
              ).toString('base64')}`;
              const url = await this.awsService.uploadBase64FileToS3(base64);
              await this.avatarRepository.save({
                age,
                sex,
                url,
              });
            }),
          );
          progressBar.increment(pageSize);
        } catch (e) {
          // ignore request failed
        }
      }
    }
  }

  async getRandomAvatar(sex: string, age: string) {
    const avatar = await this.avatarRepository
      .createQueryBuilder()
      .where({
        sex,
        age,
      })
      .orderBy('RANDOM()')
      .getOne();
    return avatar?.url;
  }
}

import { LoginReply } from 'social-credits-common/build/cjs/dto/login.dto';
import { Tool } from 'social-credits-common/build/cjs/models/tool.model';
import { errHarvestTimeout } from '@/error/api/errors';
import { riceService } from '@/service/rice.service';
import { toolService } from '@/service/tool.service';
import { AuthApiRequest, ApiRouteHandler } from '@/types/api';

export const loginRoute: ApiRouteHandler<LoginReply> = async (req, res): Promise<void> => {
  const { user, harvestLink } = req as AuthApiRequest;

  const riceCollect = await riceService.getUserRiceCollect(user);
  if (riceCollect && riceCollect.nextTime > new Date()) {
    throw errHarvestTimeout;
  }

  const userTools = await toolService.getUserTools(user);

  const data: LoginReply = {
    user: user.toJSON(),
    subjects: harvestLink.subjects,
    tools: userTools.map(tool => tool.name) as Tool[],
  };

  res.status(200).send(data);
};

import { LoginReply } from '@xyz27900/xi-rating-bot-common/build/cjs/dto/login.dto';
import { Tool } from '@xyz27900/xi-rating-bot-common/build/cjs/models/tool.model';
import { errHarvestTimeout } from '@/error/api/errors';
import { riceService } from '@/service/rice.service';
import { toolService } from '@/service/tool.service';
import { ApiRouteHandler, AuthApiRequest } from '@/types/api';

export const loginRoute: ApiRouteHandler<LoginReply> = async (req, res): Promise<void> => {
  const { user, harvestLink } = req as AuthApiRequest;

  const harvest = await riceService.getUserHarvest(user);
  if (harvest && harvest.nextTime > new Date()) {
    throw errHarvestTimeout;
  }

  const userTools = await toolService.getUserTools(user);

  const response: LoginReply = {
    user: user.toJSON(),
    subjects: harvestLink.subjects,
    tools: userTools.map(tool => tool.name) as Tool[],
  };

  res.status(200).send(response);
};

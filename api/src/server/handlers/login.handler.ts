import { Request, Response } from 'express';
import { dataSource } from '@/data.source';
import { RiceCollect } from '@/entity/rice.collect.entity';
import { UserTool } from '@/entity/user.tool.entity';
import { getRiceCollectLinkHelper } from '@/server/helpers/get.rice.collect.link.helper';
import { getUserHelper } from '@/server/helpers/get.user.helper';

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const user = await getUserHelper({ req, res, ignoreFields: ['rid'] });
  if (!user) {
    return;
  }

  const riceCollectLink = await getRiceCollectLinkHelper({ req, res, user });
  if (!riceCollectLink) {
    return;
  }

  const riceCollect = await dataSource.manager.findOneBy(RiceCollect, {
    user: { id: user.id },
  });

  if (riceCollect && riceCollect.nextTime > new Date()) {
    res.status(403).send('Wait for next time');
    return;
  }

  const userTools = await dataSource.manager.find(UserTool, {
    where: { user },
    relations: ['tool'],
  });

  const data = {
    id: user.id,
    name: user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName,
    tools: userTools.map(tool => tool.tool.name),
  };

  res.status(200).send(data);
};

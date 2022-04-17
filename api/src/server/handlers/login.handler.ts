import { Request, Response } from 'express';
import { bot } from '@/bot';
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

  let riceCollect = await dataSource.manager.findOneBy(RiceCollect, {
    user: { id: user.id },
  });

  if (riceCollect && riceCollect.nextTime > new Date()) {
    res.status(403).send('Wait for next time');
    return;
  }

  if (!riceCollect) {
    riceCollect = dataSource.manager.create(RiceCollect, { user });
  }

  riceCollect.nextTime = new Date(Date.now() + 1000 * 60 * 60 * 4);
  await dataSource.manager.save(riceCollect);

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

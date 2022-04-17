import { Request, Response } from 'express';
import { dataSource } from '@/data.source';
import { RiceCollectLink } from '@/entity/rice.collect.link.entity';
import { User } from '@/entity/user.entity';

interface GetRiceCollectLinkHelperArgs {
  req: Request;
  res: Response;
  user: User;
}

export const getRiceCollectLinkHelper = async (args: GetRiceCollectLinkHelperArgs): Promise<RiceCollectLink | null> => {
  const { req, res, user } = args;
  const { rid } = req.query;

  if (typeof rid !== 'string') {
    res.status(400).send('Invalid link');
    return null;
  }

  const riceCollectLink = await dataSource.manager.findOneBy(RiceCollectLink, { id: rid, user });
  if (!riceCollectLink) {
    res.status(404).send('Link not found');
    return null;
  }

  return riceCollectLink;
};

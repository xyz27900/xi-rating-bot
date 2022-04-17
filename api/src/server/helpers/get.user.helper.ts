import { Request, Response } from 'express';
import { dataSource } from '@/data.source';
import { User } from '@/entity/user.entity';
import { hashValidator } from '@/server/validators/hash.validator';

interface GetUserHelperArgs {
  req: Request;
  res: Response;
  ignoreFields?: string[];
}

export const getUserHelper = async (args: GetUserHelperArgs): Promise<User | null> => {
  const { req, res, ignoreFields } = args;
  const { id: idStr, hash } = req.query;

  if (typeof idStr !== 'string' || typeof hash !== 'string') {
    res.status(400).send('Invalid query');
    return null;
  }

  const id = Number(idStr);
  if (isNaN(id)) {
    res.status(400).send('Invalid id');
    return null;
  }

  const queryClone = { ...req.query };
  Object.keys(queryClone).forEach(key => {
    if (ignoreFields?.includes(key)) {
      delete queryClone[key];
    }
  });

  const isHashValid = hashValidator(queryClone);
  if (!isHashValid) {
    res.status(401).send('Invalid hash');
    return null;
  }

  const user = await dataSource.manager.findOneBy(User, { id });
  if (user) {
    return user;
  } else {
    res.status(404).send('User not found');
    return null;
  }
};

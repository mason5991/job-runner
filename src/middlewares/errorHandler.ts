import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { printError } from '../utils/log';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    next();
  }

  const errMap = JSON.parse(
    fs.readFileSync(`${__dirname}/../def/errCode.json`, 'utf8'),
  ) as {
    [key: string]: {
      code: number;
      message: string;
    };
  };

  if (err.name === 'Error') {
    if (errMap[err.message]) {
      const { code, message } = errMap[err.message];
      return res
        .status(code)
        .json({ success: false, errCode: err.message, message });
    }
    printError(
      `${err.stack} => [500][${err.name}][${err.message}] Server Error`,
    );
    return res.status(500).json({
      success: false,
      errCode: 'ServerError',
      message: 'Server Error.',
    });
  }
  return res
    .status(404)
    .json({ success: false, errCode: 'NotFound', message: 'Not found' });
};

export default errorHandler;

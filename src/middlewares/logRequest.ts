import { Request, Response, NextFunction } from 'express';
import { printInfo } from '../utils/log';

const logRequest = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.DEPLOY_STAGE !== 'production') {
    if (req.params) {
      printInfo(
        `=====Request params[${req.method} ${req.hostname} ${req.originalUrl}]===== ${JSON.stringify(req.params)}`,
      );
    }
    if (req.body) {
      printInfo(`=====Request body[${req.method} ${req.hostname} ${req.originalUrl}]===== ${JSON.stringify(req.body)}`);
    }
    if (req.query) {
      printInfo(
        `=====Request query[${req.method} ${req.hostname} ${req.originalUrl}]===== ${JSON.stringify(req.query)}`,
      );
    }
  }
  next();
};

export default logRequest;

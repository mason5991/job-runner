import { Request, Response } from 'express';

const getVersion = async (req: Request, res: Response) =>
  res.status(200).json({
    success: true,
    message: 'Success.',
    result: {
      packageVersion: process.env.PACKAGE_VERSION || '',
      refVersion: process.env.REF_VERSION || '',
    },
  });

export default {
  getVersion,
};

import { StatusCodes } from 'http-status-codes';

export function uploadHandler(req, res) {
  res.status(StatusCodes.CREATED).end();
}

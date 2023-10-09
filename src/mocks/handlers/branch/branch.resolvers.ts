/**
 * TODO: Change this according to server response
 * TODO: i18n for messages
 */

// Constants
import { LOADING_TIME, RES_CREATED, RES_OK } from '../../mocks.constants';

// Types
import { Resolver } from '../../mocks.types';

export const addBranchResolver: Resolver = (_req, res, ctx) =>
  res(ctx.delay(LOADING_TIME), ctx.status(RES_CREATED), ctx.json({ success: true, message: 'Branch Added' }));

export const editBranchResolver: Resolver = (_req, res, ctx) =>
  res(ctx.delay(LOADING_TIME), ctx.status(RES_OK), ctx.json({ success: true, message: 'Branch Editer' }));

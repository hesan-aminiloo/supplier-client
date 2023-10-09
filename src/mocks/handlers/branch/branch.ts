import { rest } from 'msw';

// Endpoints
import { addBranch, editBranch } from '@src/app/endpoints';

// Resolvers
import { addBranchResolver, editBranchResolver } from './branch.resolvers';

export const branch = [
  /**
   * Add branch
   */
  rest.post(addBranch(), addBranchResolver),

  /**
   * Edit Branch
   */
  rest.patch(editBranch(':id'), editBranchResolver),
];

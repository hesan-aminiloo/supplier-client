export const getAllRequests = '/supplier-requests';
export const createRequestResponse = (requestId: string) => `request/${requestId}/response`;
export const getRequestMessages = (requestId: string, page: number, lastMessageId: string) => {
  let request = `messages/${requestId}?page=${page}`;
  if (lastMessageId) {
    request = `messages/${requestId}?msg_id=${lastMessageId}&page=${page}`;
  }
  return request;
};
export const sendMessage = (requestId: string) => `send-message/${requestId}`;

export const getRequestEndPoint = (requestId: string) => `request/${requestId}`;

export const getDispatchRequestEndPoint = (requestId: string) => `request/${requestId}/dispatch`;
export const getRequestResponseEndPoint = (requestId: string) => `response-detail/${requestId}`;

export const getCancelRequestEndPoint = 'request/status';
export const getRequestPartsEndPoint = (requestId: string) => `parts-required/${requestId}`;

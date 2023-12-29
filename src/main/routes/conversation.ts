import {type Router} from 'express';
import {adapterExpress} from '../adapter/express-adapter';
import {
  makeAddUserConversation,
  makeGetUserConversation,
} from '../factories/controllers/conversation/get-conversation-factory';

export function conversationRoute(route: Router): void {
  route.get('/conversation/:id', adapterExpress(makeGetUserConversation()));
  route.post('/conversation', adapterExpress(makeAddUserConversation()));
}

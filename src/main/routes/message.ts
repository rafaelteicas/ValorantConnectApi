import {type Router} from 'express';
import {adapterExpress} from '../adapter/express-adapter';
import {
  makeGetMessageFactory,
  makeSendMessageFactory,
} from '../factories/controllers/message/message-factory';

export function messageRoute(route: Router): void {
  route.post('/message', adapterExpress(makeSendMessageFactory()));
  route.get('/message', adapterExpress(makeGetMessageFactory()));
}

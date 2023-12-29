import {
  BadRequest,
  Conflict,
  Missing,
  NotFound,
  ServerError,
  Unauthorized,
} from '../errors';
import {type HttpResponse} from '../protocols/http';

type httpTypes =
  | 'unauthorized'
  | 'conflict'
  | 'serverError'
  | 'missing'
  | 'success'
  | 'badRequest'
  | 'notFound';

export const response = (type: httpTypes, message?: any): HttpResponse => {
  switch (type) {
    case 'unauthorized':
      return {body: new Unauthorized().message, status: 401};
    case 'conflict':
      return {body: new Conflict().message, status: 409};
    case 'missing':
      return {body: new Missing().message, status: 400};
    case 'serverError':
      return {body: new ServerError().message, status: 500};
    case 'badRequest':
      return {body: new BadRequest().message, status: 400};
    case 'notFound':
      return {body: new NotFound().message, status: 404};
    case 'success':
      return {body: message || 'ok', status: 200};
  }
};

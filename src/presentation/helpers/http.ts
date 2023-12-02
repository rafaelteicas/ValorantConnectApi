import { Conflict, Missing, ServerError, Unauthorized } from '../errors'
import { type HttpResponse } from '../protocols/http'

type httpTypes = 'unauthorized' | 'conflict' | 'serverError' | 'missing' | 'success'

export const response = (type: httpTypes, message?: any): HttpResponse => {
  switch (type) {
    case 'unauthorized':
      return { body: new Unauthorized(), status: 401 }
    case 'conflict':
      return { body: new Conflict(), status: 409 }
    case 'missing':
      return { body: new Missing(), status: 400 }
    case 'serverError':
      return { body: new ServerError(), status: 500 }
    case 'success':
      return { body: message || 'ok', status: 200 }
  }
}

import { Unauthorized } from '../errors'
import { type HttpResponse } from '../protocols/http'

type httpTypes = 'unauthorized' | 'success'

export const response = (type: httpTypes, message?: string): HttpResponse => {
  switch (type) {
    case 'unauthorized':
      return { body: new Unauthorized(), status: 401 }
    case 'success':
      return { body: message, status: 200 }
  }
}

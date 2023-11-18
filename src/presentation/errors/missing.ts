export class Missing extends Error {
  constructor () {
    super('Missing param')
    this.name = 'Missing Error'
  }
}

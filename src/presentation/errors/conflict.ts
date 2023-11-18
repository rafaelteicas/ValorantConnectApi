export class Conflict extends Error {
  constructor () {
    super('User already exists.')
    this.name = 'Conflict Error'
  }
}

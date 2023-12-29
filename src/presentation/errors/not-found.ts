export class NotFound extends Error {
  constructor() {
    super('Not found');
    this.name = 'Not found';
  }
}

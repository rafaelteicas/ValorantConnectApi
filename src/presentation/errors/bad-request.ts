export class BadRequest extends Error {
  constructor() {
    super('Bad Request Error');
    this.name = 'Bad Request Error';
  }
}

export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in can obly be validated until 20 minues of creation.')
  }
}

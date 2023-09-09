export class MaxNmbersCheckInsError extends Error {
  constructor() {
    super('Max number of check-ins reached.')
  }
}

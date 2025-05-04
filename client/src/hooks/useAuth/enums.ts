export enum ValidationStatus {
  Valid = 0,
  InvalidFormat = 1,
  Taken = 2,
  WrongEmailOrPassword = 3,
  ForbiddenName = 4,
  InvalidCaptcha = 6,
  WrongConfirmCode = 7,
  BrokenSmsProviderError = 9,
  InvalidEmail = 11,
  NoContacts = 12,
}

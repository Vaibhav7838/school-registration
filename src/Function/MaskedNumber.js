export const maskPhoneNumber = (number) => `${'*'.repeat(number?.length - 3)}${number?.slice(-3)}`;
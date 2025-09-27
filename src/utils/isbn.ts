export const sanitizeISBN = (value: string) =>
  value.replace(/\D/g, '').slice(0, 13);

export const formatISBN = (value: string) =>
  sanitizeISBN(value)
    .match(/.{1,3}/g)
    ?.join('-') ?? '';

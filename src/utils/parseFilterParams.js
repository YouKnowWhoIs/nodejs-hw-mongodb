const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';

  if (!isString) return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavorite = (isFavorite) => {
  const isBoolean = typeof isFavorite === 'boolean';

  if (!isBoolean) return false;

  return true;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavorite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavorite = parseIsFavorite(isFavorite);

  return { contactType: parsedContactType, isFavorite: parsedIsFavorite };
};

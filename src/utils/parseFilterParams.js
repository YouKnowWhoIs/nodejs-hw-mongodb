const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';

  if (!isString) return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavorite = (isFavourite) => {
  const isBoolean = typeof isFavourite === 'boolean';

  if (!isBoolean) return false;

  return true;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavorite(isFavourite);

  return { contactType: parsedContactType, isFavourite: parsedIsFavourite };
};

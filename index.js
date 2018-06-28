const crypto = require('crypto');

module.exports = (obj, fields) => {
  const _fields = fields || [];
  const sanitizedResult = Object.assign({}, obj);

  _fields.forEach((field) => {
    if (field in sanitizedResult) {
      const value = sanitizedResult[field];
      const hashedString = crypto.createHash('sha256').update(value).digest('hex');
      sanitizedResult[field] = hashedString;
    }
  });

  return sanitizedResult;
};

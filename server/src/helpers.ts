export const sendResponse = (data, res) => {
  res.status(200).send({
    status: 'ok',
    data
  });
};

export const sendErrorResponse = (res, code?, msg?) => {
  const statusCode = 500;
  const message = 'Internal Server Error';
  const status = 'error';

  res.status((code) ? code : statusCode).send({
    status,
    message: (msg) ? msg : message,
})
  ;
};

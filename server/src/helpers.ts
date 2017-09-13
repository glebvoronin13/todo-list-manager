export const sendResponse = (data, res) => {
    res.status(200).send({
        status: 'ok',
        data
    });
};

export const sendErrorResponse = (err, res) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let status = 'error';

    res.status(statusCode).send({
        status,
        message
    });
};

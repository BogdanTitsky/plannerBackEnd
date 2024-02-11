interface ErrorMessageList {
    [key: number]: string;
}

const errorMessageList: ErrorMessageList = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',
};
interface HttpError extends Error {
    status: number;
}
const HttpError = (status: number, message = errorMessageList[status]): HttpError => {
    const error: HttpError = new Error(message) as HttpError;
    error.status = status;
    return error;
};

export default HttpError;

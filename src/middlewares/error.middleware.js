const ErrorMiddleware = (error, req, res, next) => {
    console.log('[-] ser registro un error en el middleware');
    console.log(`[#] ${error}`);
    res.status(500).json({
        message: error.message,
    });
};

export default ErrorMiddleware;

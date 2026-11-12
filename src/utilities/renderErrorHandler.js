const renderErrorHandler = (res, err) => {
    res.status(500).json({
        message: err.message || "Something went wrong!",
    })
};

module.exports = renderErrorHandler;


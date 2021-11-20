const errorHandler = (err, req, res) => {
    console.error(err);
    return res.status(500).json({
        error: err,
    });
};

module.exports = errorHandler;

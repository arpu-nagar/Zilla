export default (req, res, next) => {
    res.sendError = (err, msg = 'Internal server error') => {
        err && console.error('[ERROR] ', err);
        res.send({ success: false, msg });
    };
    res.sendSuccess = (data, msg) => {
        msg && console.log(msg);
        res.send({ success: true, msg, ...(data && { data }) });
    };
    next();
};

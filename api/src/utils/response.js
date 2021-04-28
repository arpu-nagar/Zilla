export default (req, res, next) => {
    res.sendError = (err, msg = 'Internal server error') => {
        err && console.error('[ERROR] ', err);
        res.json({ success: false, msg });
    };
    res.sendSuccess = (data, msg) => {
        msg && console.log(msg);
        res.json({ success: true, msg, ...(data && { data }) });
    };
    next();
};

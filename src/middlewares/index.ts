export const wrapAsyncMiddleware = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export function errorHandler(err, req, res, next) {
  res.status(err.cause || 500);
  res.send({
    message: err.message,
  });
}

export function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  next();
}

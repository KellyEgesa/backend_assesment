export function error(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ error: err.message });

  return;
}

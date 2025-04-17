export const ErrorHandlerMiddleware = (err, req, res, __) => {
  if (err.isException) {
    const statusCode = err?.statusCode || 400; 
    return res.status(statusCode).send({
      message: err.message,
    });
  }
  
  console.log(err);
  res.status(500).send({
    message: "Internal Server Error",
  });
};

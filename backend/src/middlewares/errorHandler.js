export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error"
  });
};

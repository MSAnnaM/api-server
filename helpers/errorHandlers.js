export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
};

// errorHandler
export const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

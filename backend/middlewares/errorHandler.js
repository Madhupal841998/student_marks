function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Duplicate entry', detail: err.detail });
    }
  
    if (err.code === '23503') {
      return res.status(400).json({ message: 'Reference error', detail: err.detail });
    }
  
    res.status(500).json({ message: 'Something went wrong!' });
  }
  
  module.exports = errorHandler;
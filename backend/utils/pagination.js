function getPaginationParams(query) {
    const page = Math.abs(parseInt(query.page)) || 1;
    const limit = Math.abs(parseInt(query.limit)) || 10;
    const offset = (page - 1) * limit;
  
    return { page, limit, offset };
  }
  
  function getPaginationLinks({ page, limit, total }, baseUrl) {
    const totalPages = Math.ceil(total / limit);
    
    return {
      first: `${baseUrl}?page=1&limit=${limit}`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
      last: `${baseUrl}?page=${totalPages}&limit=${limit}`
    };
  }
  
  module.exports = {
    getPaginationParams,
    getPaginationLinks
  };
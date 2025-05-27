class ApiResponse {
  static success(data = {}, meta = {}, statusCode = 200) {
    return {
      statusCode,
      body: {
        data,
        meta,
      },
    };
  }

  static paginated(data, count, page, limit, baseUrl) {
    const totalPages = Math.ceil(count / limit);
    const currentPage = parseInt(page);
    const from = (currentPage - 1) * limit + 1;
    const to = Math.min(from + data.length - 1, count);

    const buildLink = (p) => `${baseUrl}?page=${p}&limit=${limit}`;

    return {
      data,
      links: {
        first: buildLink(1),
        last: buildLink(totalPages),
        prev: currentPage > 1 ? buildLink(currentPage - 1) : null,
        next: currentPage < totalPages ? buildLink(currentPage + 1) : null,
      },
      meta: {
        current_page: currentPage,
        from,
        last_page: totalPages,
        per_page: parseInt(limit),
        to,
        total: count,
      },
    };
  }
}

export default ApiResponse;

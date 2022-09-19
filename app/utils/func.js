const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: wishesData } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, wishesData, totalPages, currentPage };
};

module.exports = { getPagingData };

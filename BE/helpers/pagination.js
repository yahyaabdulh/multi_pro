module.exports = {
    getPagingData: (data, page, limit) => {
        const { count: total, rows } = data;
        const currentPage = page ? +page : 0;
        const total_pages = Math.ceil(total / limit);
        const start_at = page ? ((parseInt(page) - 1) * limit) + 1 : 0;
        const end_at = start_at + (limit - 1);

        return { total, data: rows, total_pages, page: currentPage, start_at, end_at };
    },

    getPagination: (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? (parseInt(page) - 1) * limit : 0;

        return { limit, offset };
    },
}
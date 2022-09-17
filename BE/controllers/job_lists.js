const db = require("../models");
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/pagination")

module.exports = {
    index: async (req, res) => {
        try {
            const { page, per_page, description, location, type, sort, order } = req.query;

            const condition_1 = description ? {
                [Op.or]: [
                    db.Sequelize.literal(`lower(title) like '%${description?.toLowerCase()}%'`),
                    db.Sequelize.literal(`lower(description) like '%${description?.toLowerCase()}%'`),
                    db.Sequelize.literal(`lower(company) like '%${description?.toLowerCase()}%'`),
                ]
            } : {};
            const condition_2 = location ? {
                [Op.or]: [
                    db.Sequelize.literal(`lower(location) like '%${location?.toLowerCase()}%'`),
                ]
            } : {};
            const condition_3 = type ? {
                [Op.or]: [
                    db.Sequelize.literal(`type = '${JSON.parse(type) ? 'Full Time' : 'Part Time'}'`),
                ]
            } : {};

            const { limit, offset } = getPagination(page, per_page);

            const dt = await db.job_lists.findAndCountAll({
                attributes: ['title', 'description', 'type', 'company', 'location', 'created_at', 'id'],
                limit,
                offset,
                where: {
                    [Op.and]: [
                        condition_1,
                        condition_2,
                        condition_3,
                    ]
                },
                ...((order && sort) && {
                    order: [[sort, order]]
                })
            })
            const response = getPagingData(dt, page, limit)
            res.send(response);
        } catch (e) {
            let error = (!e || !Object.keys(e).length) ? e.toString() : e
            res.status(400).json({ "status": 400, error, "message": error })
        }
    },
    get_by_id: async (req, res) => {
        try {
            const { id } = req.params;
            const data_job =  await db.job_lists.findOne({
                where : {
                    id
                }
            })
            res.send(data_job);
        } catch (e) {
            let error = (!e || !Object.keys(e).length) ? e.toString() : e
            res.status(400).json({ "status": 400, error, "message": error })
        }
    }
}
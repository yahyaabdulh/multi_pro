const db = require("../models");
const { Error } = require("../helpers/validate");
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWTKEY
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION

module.exports = {
    authenticate: async (req, res) => {
        const transaction = await db.sequelize.transaction()
        try {
            const { username, password } = req.body;
            if (!username) await Error('Username tidak boleh kosong')
            if (!password) await Error('Password tidak boleh kosong')

            const user = await db.users.findOne({
                attributes: ['id', 'name', 'password', 'email', 'username', 'is_active'],
                where: {
                    [Op.or]: {
                        username: username,
                        email: username
                    }
                }
            });

            if (user && user.is_active && user?.comparePassword(password)) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        expiresIn: TOKEN_EXPIRATION
                    },
                    JWT_SECRET
                )
                await db.users.update({ last_login: new Date() }, { where: { id: user.id }, transaction })
                const { password, ...data_user } = user.toJSON()
                await transaction.commit()
                res.status(200).json({ ...data_user, token })
            } else if (user && !user.is_active) {
                await transaction.rollback()
                res.status(401).json({ status: 401, error: 'akun anda sedang di non-aktifkan', message: 'akun anda sedang di non-aktifkan' })
            } else {
                await transaction.rollback()
                res.status(401).json({ status: 401, error: 'username / password yang anda masukkan tidak sesuai', message: 'username / password yang anda masukkan tidak sesuai' })
            }
        } catch (e) {
            await transaction.rollback()
            let error = (!e || !Object.keys(e).length) ? e.toString() : e
            res.status(400).json({ "status": 400, error, "message": error })
        }
    },

    create: async (req, res) => {
        const transaction = await db.sequelize.transaction()
        try {
            const users = await db.users.create({
                ...req.body
            }, { transaction });
            const { password, ...data_user } = users.toJSON()
            res.status(200).json({ ...data_user })
            await transaction.commit()
        } catch (e) {
            await transaction.rollback()
            let error = (!e || !Object.keys(e).length) ? e.toString() : e
            res.status(400).json({ "status": 400, error, "message": error })
        }
    }
}
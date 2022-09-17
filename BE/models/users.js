const bcrypt = require("bcryptjs")

module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Nama tidak boleh kosong" }
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username harus unique.',
                fields: [sequelize.fn('lower', sequelize.col('username'))]
            },
            validate: {
                notEmpty: { msg: "Username tidak boleh kosong" }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email harus unique.',
                fields: [sequelize.fn('lower', sequelize.col('username'))]
            },
            validate: {
                notEmpty: { msg: "Email tidak boleh kosong" }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Password tidak boleh kosong" }
            }
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        last_login: {
            type: Sequelize.DATE
        },
        created_at: {
            allowNull: false,
            defaultValue : Sequelize.NOW,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            defaultValue : Sequelize.NOW,
            type: Sequelize.DATE
        }
    }, {
        hooks: {},
        createdAt: false,
        updatedAt: false,
    });

    users.beforeCreate(async (user) => {
        user.password = await user.generatePasswordHash();
    });

    users.prototype.generatePasswordHash = function () {
        if (this.password) {
            return bcrypt.hash(this.password, 10);
        }
    };

    users.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return users;
};
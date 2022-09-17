
module.exports = (sequelize, Sequelize) => {
    const job_lists = sequelize.define("job_lists", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                notEmpty: { msg: "Tipe pekerjaan tidak boleh kosong" }
            }
        },
        url: {
            allowNull: false,
            type: Sequelize.TEXT,
            validate: {
                notEmpty: { msg: "Url pekerjaan tidak boleh kosong" }
            }
        },
        company: {
            type: Sequelize.STRING,
        },
        company_url: {
            type: Sequelize.TEXT,
        },
        location: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Nama pekerjaan tidak boleh kosong" }
            }
        },
        description: {
            type: Sequelize.TEXT,
        },
        how_to_apply: {
            type: Sequelize.TEXT,
        },
        company_logo: {
            type: Sequelize.TEXT,
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

    return job_lists;
};
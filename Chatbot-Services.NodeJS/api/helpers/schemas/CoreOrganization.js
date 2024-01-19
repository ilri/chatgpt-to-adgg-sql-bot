module.exports = function (sequelize, Sequelize) {
    const CoreOrganization = sequelize.define(
      "core_organization",
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(255),
        },
        country_id: {
          type: Sequelize.INTEGER,
        },
        is_active: {
          type: Sequelize.BOOLEAN,
        },
        created_at: {
          type: Sequelize.DATE,
        },
        created_by: {
          type: Sequelize.INTEGER,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
    return CoreOrganization;
  };
  
module.exports = function (sequelize, Sequelize) {
  const CountryUnits = sequelize.define(
    "country_units",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_id: {
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(128),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      level: {
        type: Sequelize.BOOLEAN,
      },

      parent_id: {
        type: Sequelize.INTEGER,
      },
      parent_odkcode: {
        type: Sequelize.INTEGER,
      },
      contact_name: {
        type: Sequelize.STRING(128),
      },
      contact_phone: {
        type: Sequelize.STRING(20),
      },
      contact_email: {
        type: Sequelize.STRING(255),
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      uuid: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CountryUnits;
};

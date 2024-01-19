module.exports = function (sequelize, Sequelize) {
  const CoreCountry = sequelize.define(
    "core_country",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(128),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      country: {
        type: Sequelize.STRING(3),
      },
      contact_person: {
        type: Sequelize.STRING(30),
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
      unit1_name: {
        type: Sequelize.STRING(30),
      },
      unit2_name: {
        type: Sequelize.STRING(30),
      },
      unit3_name: {
        type: Sequelize.STRING(30),
      },
      unit4_name: {
        type: Sequelize.STRING(30),
      },
      dialing_code: {
        type: Sequelize.STRING(5),
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
  return CoreCountry;
};

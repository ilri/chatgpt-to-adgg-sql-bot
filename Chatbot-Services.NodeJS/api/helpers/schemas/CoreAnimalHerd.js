module.exports = function (sequelize, Sequelize) {
  const CoreAnimalHerd = sequelize.define(
    "core_animal_herd",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      farm_id: {
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.INTEGER,
      },
      // region_id: {
      //   type: Sequelize.INTEGER,
      // },
      // district_id: {
      //   type: Sequelize.INTEGER,
      // },
      // ward_id: {
      //   type: Sequelize.INTEGER,
      // },
      // village_id: {
      //   type: Sequelize.INTEGER,
      // },
      // org_id: {
      //   type: Sequelize.INTEGER,
      // },
      // client_id: {
      //   type: Sequelize.INTEGER,
      // },
      // latitude: {
      //   type: Sequelize.DECIMAL(13, 8),
      // },
      // longitude: {
      //   type: Sequelize.DECIMAL(13, 8),
      // },
      // map_address: {
      //   type: Sequelize.STRING,
      // },
      // latlng: {
      //   type: Sequelize.STRING,
      // },
      reg_date: {
        type: Sequelize.DATEONLY,
      },
      // project: {
      //   type: Sequelize.STRING,
      // },
      // additional_attributes: {
      //   type: Sequelize.JSON,
      // },
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
      // migration_id: {
      //   type: Sequelize.STRING,
      // },
      // odk_form_uuid: {
      //   type: Sequelize.STRING,
      // },
      // species: {
      //   type: Sequelize.STRING,
      // },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CoreAnimalHerd;
};

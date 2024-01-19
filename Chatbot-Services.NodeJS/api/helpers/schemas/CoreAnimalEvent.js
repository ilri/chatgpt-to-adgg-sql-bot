module.exports = function (sequelize, Sequelize) {
  const CoreAnimalEvent = sequelize.define(
    "core_animal_event",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      animal_id: {
        type: Sequelize.INTEGER,
      },
      event_type: {
        type: Sequelize.INTEGER,
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
      org_id: {
        type: Sequelize.INTEGER,
      },
      // client_id: {
      //   type: Sequelize.INTEGER,
      // },
      event_date: {
        type: Sequelize.DATEONLY,
      },
      data_collection_date: {
        type: Sequelize.DATEONLY,
      },
      latitude: {
        type: Sequelize.DECIMAL(13, 8),
      },
      longitude: {
        type: Sequelize.DECIMAL(13, 8),
      },
      // map_address: {
      //   type: Sequelize.STRING,
      // },
      // latlng: {
      //   type: Sequelize.STRING,
      // },
      // uuid: {
      //   type: Sequelize.STRING,
      // },
      // field_agent_id: {
      //   type: Sequelize.INTEGER,
      // },
      // lactation_id: {
      //   type: Sequelize.INTEGER,
      // },
      // lactation_number: {
      //   type: Sequelize.INTEGER,
      // },
      // testday_no: {
      //   type: Sequelize.INTEGER,
      // },
      additional_attributes: {
        type: Sequelize.JSON,
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
      // migration_id: {
      //   type: Sequelize.STRING,
      // },
      // odk_form_uuid: {
      //   type: Sequelize.STRING,
      // },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CoreAnimalEvent;
};

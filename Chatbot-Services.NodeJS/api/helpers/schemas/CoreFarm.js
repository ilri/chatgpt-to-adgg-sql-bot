module.exports = function (sequelize, Sequelize) {
  const CoreFarm = sequelize.define(
    "core_farm",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
      },
      name: {
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
      org_id: {
        type: Sequelize.INTEGER,
      },
      // client_id: {
      //   type: Sequelize.INTEGER,
      // },
      reg_date: {
        type: Sequelize.DATEONLY,
      },
      farmer_name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      // field_agent_id: {
      //   type: Sequelize.INTEGER,
      // },
      // project: {
      //   type: Sequelize.STRING,
      // },
      // farm_type: {
      //   type: Sequelize.STRING(30),
      // },
      // gender_code: {
      //   type: Sequelize.STRING(10),
      // },
      // farmer_is_hh_head: {
      //   type: Sequelize.BOOLEAN,
      // },
      // is_active: {
      //   type: Sequelize.BOOLEAN,
      // },
      // is_coop: {
      //   type: Sequelize.STRING(50),
      // },
      // is_gr: {
      //   type: Sequelize.STRING(50),
      // },
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
      // odk_code: {
      //   type: Sequelize.STRING,
      // },
      // odk_farm_code: {
      //   type: Sequelize.STRING(128),
      // },
      // additional_attributes: {
      //   type: Sequelize.JSON,
      // },
      // feedback_status: {
      //   type: Sequelize.INTEGER,
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
      is_deleted: {
        type: Sequelize.BOOLEAN,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      deleted_by: {
        type: Sequelize.INTEGER,
      },
      // migration_id: {
      //   type: Sequelize.STRING,
      // },
      // odk_form_uuid: {
      //   type: Sequelize.STRING(128),
      // },
      // unique_id_odk: {
      //   type: Sequelize.STRING(45),
      // },
      // feedback_count: {
      //   type: Sequelize.INTEGER,
      // },
      // is_cooperative: {
      //   type: Sequelize.BOOLEAN,
      // },
      // is_group: {
      //   type: Sequelize.BOOLEAN,
      // },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CoreFarm;
};

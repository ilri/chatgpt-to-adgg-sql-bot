module.exports = function (sequelize, Sequelize) {
  const CoreAnimal = sequelize.define(
    "core_animal",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      tag_id: {
        type: Sequelize.STRING,
      },
      farm_id: {
        type: Sequelize.INTEGER,
      },
      herd_id: {
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
      animal_type: {
        type: Sequelize.INTEGER,
      },
      // species: {
      //   type: Sequelize.INTEGER,
      // },
      // sex: {
      //   type: Sequelize.INTEGER,
      // },
      birthdate: {
        type: Sequelize.DATEONLY, // Assuming you want to store the date only
      },
      // sire_type: {
      //   type: Sequelize.INTEGER,
      // },
      // sire_id: {
      //   type: Sequelize.INTEGER,
      // },
      // sire_tag_id: {
      //   type: Sequelize.STRING,
      // },
      // dam_id: {
      //   type: Sequelize.INTEGER,
      // },
      // dam_tag_id: {
      //   type: Sequelize.STRING,
      // },
      // main_breed: {
      //   type: Sequelize.INTEGER,
      // },
      // breed_composition: {
      //   type: Sequelize.INTEGER,
      // },
      // animal_photo: {
      //   type: Sequelize.STRING,
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
      // uuid: {
      //   type: Sequelize.STRING,
      // },
      // additional_attributes: {
      //   type: Sequelize.JSON, // Assuming additional_attributes is a JSON field
      // },
      reg_date: {
        type: Sequelize.DATEONLY, // Assuming you want to store the date only
      },
      // hair_sample_id: {
      //   type: Sequelize.STRING,
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
      // odk_animal_code: {
      //   type: Sequelize.STRING,
      // },
      // is_active: {
      //   type: Sequelize.INTEGER,
      // },
      // original_tag_id: {
      //   type: Sequelize.STRING,
      // },
      // is_sire_animal_known: {
      //   type: Sequelize.STRING,
      // },
      // is_dam_animal_known: {
      //   type: Sequelize.STRING,
      // },
      // is_ear_tag: {
      //   type: Sequelize.STRING,
      // },
      // tag_id_type: {
      //   type: Sequelize.STRING,
      // },
      // other_tag_id: {
      //   type: Sequelize.STRING,
      // },
      // species_name: {
      //   type: Sequelize.STRING,
      // },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CoreAnimal;
};

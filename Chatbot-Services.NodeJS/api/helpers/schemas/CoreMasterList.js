module.exports = function (sequelize, Sequelize) {
  const CoreMasterList = sequelize.define(
    "core_master_list",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.STRING(128),
      },
      label: {
        type: Sequelize.STRING(255),
      },
      color: {
        type: Sequelize.STRING(128),
      },
      species_id: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING(128),
      },
      description: {
        type: Sequelize.STRING(255),
      },
      list_type_id: {
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
      is_deleted: {
        type: Sequelize.BOOLEAN,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      deleted_by: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return CoreMasterList;
};

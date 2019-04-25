'use strict';
module.exports = (sequelize, DataTypes) => {
  const skill = sequelize.define('skill', {
    name: DataTypes.STRING
  }, {});
  skill.associate = function(models) {
    // associations can be defined here
    models.skill.belongsToMany(models.user,{
      through: models.userSkills
    })
  };
  return skill;
};

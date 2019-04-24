'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    status: DataTypes.STRING,
    contact: DataTypes.STRING,
    likeness: DataTypes.INTEGER,
    interviewDate: DataTypes.DATE,
    interviewAddress: DataTypes.TEXT,
    jobId: DataTypes.INTEGER
  }, {});
  match.associate = function(models) {
    // associations can be defined here
      models.match.belongsTo(models.job)
  };
  return match;
};

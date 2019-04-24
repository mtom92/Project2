'use strict';
module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('job', {
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    location: DataTypes.TEXT,
    logo: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  job.associate = function(models) {
    // associations can be defined here
    models.job.belongsTo(models.user)
    models.job.hasOne(models.match)
  };
  return job;
};

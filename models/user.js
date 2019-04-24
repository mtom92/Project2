'use strict';
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Hey, please give me a valid email address!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 32],
          msg: 'Your password must be between 8 and 32 characters in length.'
        }
      }
    },
    birthday: DataTypes.DATE,
    bio: DataTypes.TEXT,
    image: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: {
          msg: 'Aww, no pic? :('
        }
      }
    },
    admin : {
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },
    facebookId : DataTypes.STRING,
    facebookToken : DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (pendingUser) => {
        if(pendingUser && pendingUser.password) {
          // hash the password before it goes into user table
          let hash = bcrypt.hashSync(pendingUser.password, 12)

          // Reassign the password to the hashed value
          pendingUser.password = hash
        }
      }
    }
  })

  user.associate = function(models) {
    // associations can be defined here
      models.user.hasMany(models.job)
      models.user.belongsToMany(models.skill,{
    through: models.userSkills
  })
  }

  user.prototype.validPassword = function(typedInPassword){
    return bcrypt.compareSync(typedInPassword , this.password )
  }

  return user
}

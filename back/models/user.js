import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:@localhost:3306/languagechat", {
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

const User = sequelize.define("user_details", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  native_language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  practicing_language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
}});

//   User.init({
//     user_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     }
//   }, { sequelize });

//   (async () => {
//     await sequelize.sync({ force: true });
//   })();

// // User.sync({ alter: true })
sequelize.sync();

sequelize.define(
  "User",
  {},
  {
    tableName: "user_details",
  }
);

export default User;

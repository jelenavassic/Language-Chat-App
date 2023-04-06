import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:@localhost:3306/languagechat", {
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

const ChatMessages = sequelize.define("chat_messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});
sequelize.sync();

// sequelize.define(
//   "ChatMessages",
//   {},
//   {
//     tableName: "chat_messages",
//   }
// );

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to chat database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default ChatMessages;

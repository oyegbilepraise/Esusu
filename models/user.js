module.exports = (sequelize, DataTypes) => {
  const USER = sequelize.define("user", {
    phoneNumber: { type: DataTypes.STRING, unique: true, required: true },
    picture: { type: DataTypes.STRING, required: false },
    address: { type: DataTypes.STRING, required: false },
    full_name: { type: DataTypes.STRING, required: false },
    city: { type: DataTypes.STRING, required: false },
    state: { type: DataTypes.STRING, required: false },
    country: { type: DataTypes.STRING, required: false },
    DOB: { type: DataTypes.DATE, required: false },
    isAdmin: {type:DataTypes.BOOLEAN, required: false, defaultValue: false},
    email: {
      type: DataTypes.STRING,
      required: false,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      },
    },
  });

  return USER;
};

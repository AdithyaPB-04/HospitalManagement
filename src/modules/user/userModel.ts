import { Model, DataTypes } from "sequelize";
import sequelize from "../..";
import validator from "validator";
import bcrypt from "bcrypt";

export class User extends Model {
  // public password!: string; // Define password property explicitly
}

// Define docAvatar class
class DocAvatar extends Model {
  public _id!: string;
  public url!: string;
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
        min: {
          args: [3],
          msg: "First name must be at least 3 characters long",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email address",
        },
        notEmpty: {
          msg: "Email address cannot be empty",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isValidPhoneNumber(value: any) {
          if (String(value).length < 10) {
            throw new Error("Phone number must be at least 10 digits long");
          }
        },
        isNumeric: {
          msg: "Phone number must be a valid numeric value",
        },
      },
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNIC(value: any) {
          if (!validator.isLength(value, { min: 13, max: 13 })) {
            throw new Error("NIC must be exactly 13 characters long");
          }
        },
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Male", "Female"]],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Admin", "Patient", "Doctor"]],
      },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorDepartment: {
      type: DataTypes.STRING,
    },
    docAvatar: {
      type: DataTypes.TEXT, // Assuming docAvatar is a JSONB type
    },
  },
  {
    sequelize,
    tableName: "user",
    hooks: {
        async beforeCreate(user:any) {
            if (user.password) {
              const hashedPassword = await bcrypt.hash(user.password, 10);
              user.password = hashedPassword;
            }
          } ,
          async beforeUpdate(user:any) {
            if (user.changed('password')) {
              const hashedPassword = await bcrypt.hash(user.password, 10);
              user.password = hashedPassword;
            }
          }     
    },
  }
);

export default User;

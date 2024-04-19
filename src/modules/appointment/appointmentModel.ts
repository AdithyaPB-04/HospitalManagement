import { Model,DataTypes } from "sequelize";
import sequelize from "../..";
import validator from "validator";

export class Appointment extends Model{

}

class doctor extends Model {
    public firstName!: string;
    public lastName!: string;
  }

Appointment.init({
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
      appointment_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
      },
      department:{
        type:DataTypes.STRING,
        allowNull:false
      },
      doctor:{
       type:DataTypes.JSON
      },
      hasVisited:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      doctorId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      patientId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      address:{
        type:DataTypes.STRING,
        allowNull:false
      },
      status:{
        type:DataTypes.STRING,
        validate:{
            isIn:[["Pending","Accepted","Rejected"]],
        },
        defaultValue:"Pending"
      }
     
},{
    sequelize,
    tableName:'appointment'
})
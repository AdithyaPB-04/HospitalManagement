import { Model, DataTypes } from "sequelize";
import sequelize from "../..";

export class Message extends Model {}

Message.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
            min: {
                args: [3],
                msg: "First name must be at least 3 characters long"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Invalid email address"
            },
            notEmpty: {
                msg: "Email address cannot be empty"
            }
        }
    },
    phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            isValidPhoneNumber(value:any) {
                if (String(value).length < 10) {
                    throw new Error("Phone number must be at least 10 digits long");
                }
            },
            isNumeric: {
                msg: "Phone number must be a valid numeric value"
            }
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'message'
});

export default Message;

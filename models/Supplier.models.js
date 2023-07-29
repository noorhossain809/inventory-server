const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator")


const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name'],
        minLength: [3, "Name must be at least 3 character."],
        mixLength: [100, "Name is to large"],
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        trim: true,
        lowercase: true
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    contactNumber: [
        {
            type: String,
            required: [true, "Please provide a contact number"],
            validate: (value) => {
                return validator.isMobilePhone(value)
            },
            message: "Please provide a valid phone number"
        }
    ],
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emergency contact number"],
        validate: (value) => {
            return validator.isMobilePhone(value)
        },
        message: "Please provide a valid phone number"
    },
    tradeLicenseNumber: {
        type: Number,
        required: [true, "Please provide your trade license number"],

    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "khulna", "rajshahi", "barishall"],
            message: "{VALUE} is not  acorrect division!"
        }
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide a present address."]
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide a permanent address."]
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    nationalIdNumber: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url."]
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    }
    
}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
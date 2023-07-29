const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const validator = require("validator")


const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name for this product'],
        lowercase: true,
        unique: [true, "Name must be unique"],
        maxLength: [100, "Name is too large"],
        minLength: [3, "Name must be at least 3 characters."]
    },
    description: {
        type: String,
        required: true
    },
    unit : {
        type : String,
        required : true,
        enum : {
          values : ["kg", "litre", "pcs", "beg"],
          message : "Unite value can't be {VALUE}, must be kg/litre/pcs/beg"
        }
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinue"],
            message: "status can't be {VALUE}"
        }
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id:{
            type: ObjectId,
            required: true,
            ref: 'Brand'
        }
    },
    store: {
        name: {
            type: String,
            required: [true, "Please provide a store name."],
            trim: true,
            lowercase: true,
            enum: {
                values: ["dhaka", "chattogram", "khulna", "rajshahi", "barishall"],
                message: "{VALUE} is not a valid name."
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Store'
        }
    },
    suppliedBy: {
        name:{
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"],
        },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Supplier'
        }
    }
},{
    timeStamps: true
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;
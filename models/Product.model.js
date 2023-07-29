const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const validator = require("validator")

// SCHEMA ---> MODEL ---> QUERY

// Product Schema
const productSchema = mongoose.Schema({
    name : {
      type : String,
      required : [true, "Please provide a name for this product."],
      trim : true,
      unique : [true, "Name must be unique"],
      minLength : [3, "Name must be at least 3 character."],
      maxLength : [100, "Name is true large"]
    },
    description : {
      type : String,
      required : true
    },
    unit : {
      type : String,
      required : true,
      enum : {
        values : ["kg", "litre", "pcs", "bag"],
        message : "Unite value can't be {VALUE}, must be kg/litre/pcs/bag"
      }
    },
    imageUrls: [{
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if(!Array.isArray(value)){
            return false
          }
          let isValid = true;
          value.forEach((url) => {
            if(!validator.isURL(url)){
               isValid = false
            }
          })
          return isValid
        },
        message: 'Please provide a valid url.'
      }
    }],
    category: {
      type: String,
      required: true
    },
    brand: {
      name: {
        type: String,
        required: true
      },
      id: {
        type: ObjectId,
        required: true,
        ref: 'Brand'
      }
    }
    // createdAt : {
    //   type : Date,
    //   default: Date.now
    // },
    // updatedAt : {
    //   type : Date,
    //   default: Date.now
    // },
    // supplier : {
    //   type : mongoose.Types.ObjectId,
    //   ref : "Supplier"
    // },
    // categories : [{
    //   name : {
    //     type : String,
    //     required : true
    //   },
    //   _id : mongoose.Types.ObjectId
    // }]
  }, {
    timestamps : true,
  })
  
  // mongoose middleweres for saving data: pre/post
  
  productSchema.pre('save', function(next){
    console.log('before data saving')
     // instance creation ---> Do something ---> save()
     // this -->
     if(this.quantity === 0){
      this.status = "out-of-stock"
    }
    next()
  })
  
  // productSchema.post('save', function(doc,next){
  //   console.log('after data saving')
  //   next()
  // })
  
  // mongoose methods
  productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`)
  }
  
  // MODEL
  const Product = mongoose.model("Product", productSchema);

module.exports = Product;
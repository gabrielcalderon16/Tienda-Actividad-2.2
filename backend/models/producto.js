const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true,
    },
    cantidad:{
        type:Number,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    categoria:{
        type: String,
        required:true,
    }
})

module.exports = model('Product', ProductSchema)
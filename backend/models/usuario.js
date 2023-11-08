const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({

    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'USER'
    },
    favorites:{
        type:Array,
        required:true,
        default:[]
    },
    direccion:{
        type:String,
        default:''
    },
    telefono:{
        type:Number,
        default:0
    }
})

UsuarioSchema.method('toJSON', function(){
  const {__v, _id, password, ...object} = this.toObject()
    object.uid = _id
  return object
})

module.exports = model('Usuario', UsuarioSchema)
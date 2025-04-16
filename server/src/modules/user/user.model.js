import mongoose from "mongoose"

const UserSchema=mongoose.Schema(
    {
        name:{
            type: mongoose.SchemaTypes.String,
            required:true
        },
        email:{
            type:mongoose.SchemaTypes.String,
            required:true,
            unique:true,
            match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim
        },
        password:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        role:{
            type:mongoose.SchemaTypes.String, 
            enum:["USER","ADMIN","MANAGER"],
            default:"USER"
        },
        balance:{
            type:mongoose.SchemaTypes.Decimal128,
            default:0
        },
        income:{
            type:mongoose.SchemaTypes.Decimal128,
            default:0
        },
    },
    {
        collection: "users", 
        timestamps: true,
        versionKey: false,
    }
)

const User = mongoose.model("User", UserSchema);

export default User;
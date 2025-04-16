import mongoose from "mongoose";

const CategorySchema=mongoose.Schema(
    {
        name:{
            type:mongoose.SchemaTypes.String,
            unique:true,
            required:true
        }
    },
    {
        collection: "categories", 
        timestamps: true,
        versionKey: false
    }
)
const Category=mongoose.model("Category",CategorySchema)

export default Category
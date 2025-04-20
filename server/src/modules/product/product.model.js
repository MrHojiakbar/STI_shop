import mongoose from "mongoose"

const ProductSchema=mongoose.Schema(
    {
        name:{
            type: mongoose.SchemaTypes.String,
            required:true
        },
        description:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        imageUrl:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        price:{
            type:Number,
            default:0
        },
        quantity:{
            type:mongoose.SchemaTypes.Number,
            default:1
        },
        is_active:{
            type:mongoose.SchemaTypes.Boolean,
            default:true
        },
        user_id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"users",
            required:true
        },
        category_id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"categories",
            required:true
        }
    },
    {
        collection: "products", 
        timestamps: true,
        versionKey: false,
    }
)

const Product = mongoose.model("Product", ProductSchema);

export default Product;
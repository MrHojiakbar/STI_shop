import mongoose from "mongoose"

const CartItemSchema=mongoose.Schema(
    {
        user_id:{
            type: mongoose.SchemaTypes.ObjectId,
            ref :"users",
            required:true
        },
        product_id:{
            type: mongoose.SchemaTypes.ObjectId,
            ref :"products",
            required:true
        },
        quantity:{
            type:Number,
            default:1
        }
    },
    {
        collection: "cartItems", 
        timestamps: true,
        versionKey: false,
    }
)

const CartItem = mongoose.model("cartItems", CartItemSchema);

export default CartItem;
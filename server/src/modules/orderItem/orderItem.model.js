import mongoose from "mongoose"

const OrderItemSchema=mongoose.Schema(
    {
        order_id:{
            type: mongoose.SchemaTypes.ObjectId,
            ref :"orders",
            required:true
        },
        product_id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref :"products",
            required:true
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number,
            default:0
        }
    },
    {
        collection: "orderItems", 
        timestamps: true,
        versionKey: false,
    }
)

const OrderItem = mongoose.model("ordersItems", OrderItemSchema);

export default OrderItem;
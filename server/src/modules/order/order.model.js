import mongoose from "mongoose"

const OrderSchema=mongoose.Schema(
    {
        user_id:{
            type: mongoose.SchemaTypes.ObjectId,
            ref :"users",
            required:true
        },
        status:{
            type:mongoose.SchemaTypes.String, 
            enum:["PENDING","SUCCES","CANCELED"],
            default:"PENDING"
        },
        total_price:{
            type:Number,
            default:0
        }
    },
    {
        collection: "orders", 
        timestamps: true,
        versionKey: false,
    }
)

const Order = mongoose.model("orders", OrderSchema);

export default Order;
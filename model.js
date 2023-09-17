import mongoose from 'mongoose'
// name, last, buy, Sell, volume, base_unit

const dataSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    last:{
        type:String,
    },
    buy:{
        type:String,
    },
    sell:{
        type:String,
    },
    volume:{
        type:String,
    },
    base_unit:{
        type:String,
    }
});


export default mongoose.model("data",dataSchema);
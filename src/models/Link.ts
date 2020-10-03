import mongoose, {Schema, model} from "mongoose";

const LinkSchema = new Schema({
    id: String,
    redirect: String
})

export default model("Link", LinkSchema)
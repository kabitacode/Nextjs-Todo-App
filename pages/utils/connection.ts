import mongoose, {Model, mongo} from "mongoose";

const {DB_URL} = process.env

export const connect = async () => {
   const conn = await mongoose.connect(DB_URL as string)
   .catch((error) => console.log(error))
   console.log("Mongoose connection estabilized");

//    Schema 
const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean
})

// Model
const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

return {conn, Todo}

}
import mongoose, { Schema } from "mongoose"

const postSchema = new Schema({
   title: {
      required: true,
      type: String
   },
   body: {
      required: true,
      type: String
   },
   author: {
      required: true,
      type: String
   }
}, { timestamps: true })

export default mongoose.model('Post', postSchema)

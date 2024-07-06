import Post from '../models/postModel.js'


// Create post controller
export const createPost = async (req, res) => {
   const { title, body, author } = req.body

   try {
      const newPost = new Post({
         title,
         body,
         author
      })

      const savePost = await newPost.save()
      res.status(201).json({ status: 'Success', message: 'Create post succesfully!', data: savePost })
   } catch (error) {
      res.status(204).json({ status: 'Failed', message: `Error: ${error.message}` })
   }
}

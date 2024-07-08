import jwt from 'jsonwebtoken'

export const authentication = async (req, res, next) => {
   const header = req.headers['authorization']
   const token = header && header.split(" ")[1];

   if (!token) return res.status(401).json({ message: "Unauthenticated" })

   // Verification token
   jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
      if (error) return res.status(403).json({ message: "Invalid token" })

      req.user = decoded
      next()
   })
}

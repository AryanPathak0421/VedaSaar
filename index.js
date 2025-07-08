// import express from 'express'
// import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import cookieParser from 'cookie-parser'
// import cors from "cors"

// import userRoutes from './routes/user.route.js'
// import promtRoutes from './routes/promt.route.js'


// dotenv.config()

// const app = express()
// const port = process.env.PORT || 3000
// const MONGO_URL=process.env.MONGO_URI

// // middleware 
// app.use(express.json())
// app.use(cookieParser())

// app.use(
//   cors({
//     // origin:process.env.FRONTENT_URL,


//     origin: process.env.FRONTEND_URL,
//       // 'http://localhost:5173',
//       // 'http://localhost:3000'
//     // ],
//     credentials:true,
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Authorization", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
//   })
// );

// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //   next();
// // });

// //DB connection Code Goes Here!!!
// mongoose.connect(MONGO_URL).then(()=>console.log("Connected to MongoDB successfully")).catch((error)=>console.error("MongoDB connection Error: ",error))



// // routes
// app.use("/api/v1/user",userRoutes)
// app.use("/api/v1/gemini/chat",promtRoutes)

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })





import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from "cors"

import userRoutes from './routes/user.route.js'
import promtRoutes from './routes/promt.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URI

// middleware 
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      'https://vedasaar.netlify.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

// Basic route for health check
app.get('/', (req, res) => {
  res.json({ message: 'VedaSaar Backend is running!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// DB connection Code Goes Here!!!
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection Error: ", error))

// routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/gemini/chat", promtRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`)
  console.log(`API_KEY: ${process.env.GEMINI_API_KEY ? 'Loaded' : 'Not found'}`)
})
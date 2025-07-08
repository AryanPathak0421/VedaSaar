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






import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import promtRoutes from './routes/promt.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ FIX: You had "FRONTENT_URL" typo earlier
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // ✅ SIMPLIFIED & corrected
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// ✅ Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/gemini/chat', promtRoutes);

// ✅ Default route (important for "Cannot GET /")
app.get('/', (req, res) => {
  res.send('✅ VedaSaar Backend is Running');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

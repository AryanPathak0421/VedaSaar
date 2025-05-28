// import OpenAI from "openai";
// import { Promt } from "../model/promt.model.js";
// // import {sendPromt} from "../controller/user.controller.js"

// const openai = new OpenAI({
//     baseURL: 'https://api.deepseek.com',
//     apiKey: process.env.OPENAI_API_KEY
// });

// console.log(openai.apiKey)
// export const sendPromt= async(req,res)=>{
//     const {content} = req.body;
//     const userId= req.userId;

//     if(!content || content.trim()==="")
//         {
//             return res.status(400).json({errors:"Prompt content is required"})
//         }
//         try {
//             //save user promt
//             const userPromt= await Promt.create({
//                 userId,
//                 role:"user",
//                 content,
//             })

//             //send to open ai
//             const completion = await openai.chat.completions.create({
//                 messages: [{ role: "user", content: content }],
//                 model: "deepseek-chat",
//               });

//               const aiContent= completion.choices[0].message.content

//               //save Assistant promt
//             const aiMessage= await Promt.create({
//                 userId,
//                 role:"assistant",
//                 content: aiContent
//             })
//             return res.status(200).json({reply:aiContent})
//         } catch (error) {
//             console.log("Error in Prompt: ",error)
//             return res.status(500).json({error:"Something went wrong with the AI response"})
            
//         }
// }



import { GoogleGenerativeAI } from "@google/generative-ai";
import { Promt } from "../model/promt.model.js";
// import {sendPromt} from "../controller/user.controller.js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log(process.env.GEMINI_API_KEY)

export const sendPromt = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;

    if (!content || content.trim() === "") {
        return res.status(400).json({ errors: "Prompt content is required" })
    }

    try {
        // Save user prompt
        const userPromt = await Promt.create({
            userId,
            role: "User", // Exact match from your schema enum
            content,
        })

        // Send to Google Gemini
        const result = await model.generateContent(content);
        const response = await result.response;
        const aiContent = response.text();

        // Save Assistant prompt
        const aiMessage = await Promt.create({
            userId,
            role: "assistant", // Exact match from your schema enum
            content: aiContent
        })

        return res.status(200).json({ reply: aiContent })
    } catch (error) {
        console.log("Error in Prompt: ", error)
        return res.status(500).json({ error: "Something went wrong with the AI response" })
    }
}
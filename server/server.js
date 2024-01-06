import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from "openai";

dotenv.config();
console.log(process.env.OpenAI_API_KEY)

const openai = new OpenAI (

    {apiKey: "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"
});

const app = express ();
app.use(cors());
app.use (express.json());

app.use(express.static('client'));


app.get('/', async function (req, res) {
        res.status(200).send({
            message: 'Hello from CodeX',
        });
    });

app.post('/', async (req, res)=> {
try  {
const prompt = req.body.prompt;

const response = await openai.chat.completions.create({
 model:"gpt-3.5-turbo-0301",
 prompt: `${prompt}`,
 temperature: 0,
 max_tokens: 3000,
 top_p: 1,
 frequency_penalty: 0.5,
 presence_penalty: 0,
});

res.status(200).send({
 bot: response.choices[0].text
})
}catch (error){
console.log (error)
res.status(500).send({error})
}
 })

 app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))
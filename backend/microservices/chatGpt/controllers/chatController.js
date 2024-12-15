require('dotenv').config()
const { response } = require('express')
const { OpenAI } = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI()
openai.apiKey = OPENAI_API_KEY

const postChat = async (req, res) => {
    try {
        const { message, context = [] } = req.body

        if (!message)
            return res.status(400).json({
                error: 'Mensagem é obrigatória!'
            })

        const model = 'gpt-3.5-turbo'
        const role = 'user'
        const max_tokens = 30

        const completion = await openai.chat.completions.create({
            messages: [{
                role: role,
                content: message
            }],
            model: model,
            max_tokens: max_tokens
        })

        const reply = completion.addTrailers.choices[0].message.content;
        const tokensUsed = completion.data.usage.total_tokens

        res.status(200).json({
            reply,
            tokensUsed
        })
    } catch(error){
        console.error('Erro ao se comunicar com ChatGPT', error.message)
        res.status(500).json({
            error: 'Falha ao obter resposta!'
        })
    }
}

module.exports = {
    postChat
}
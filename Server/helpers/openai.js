const { OpenAI } = require("openai")
const key = process.env.OPENAI_API_KEY

async function openAI_JP(input) {
    const openai = new OpenAI({
        apiKey: key
    })

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Tolong translasi "${input}" ke bahasa jepang, tetapi saya hanya butuh jawabannya saja` }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content
}

async function openAI_EN(input) {
  const openai = new OpenAI({
      apiKey: key
  })

  const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `Tolong translasi "${input}" ke bahasa english, tetapi saya hanya butuh jawabannya saja` }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content
}

async function openAI_KR(input) {
  const openai = new OpenAI({
      apiKey: key
  })

  const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `Tolong translasi "${input}" ke bahasa korea, tetapi saya hanya butuh jawabannya saja` }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content
}

module.exports = {
  openAI_JP,
  openAI_EN,
  openAI_KR
}
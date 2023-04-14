const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const bookTitle = req.query.title;

  if (!bookTitle) {
    return res.status(400).send('Book title is required.');
  }

  const prompt = `Write a thorough yet concise summary of ${bookTitle}. Concentrate on only the most important takeaways and primary points from the book that together will give me a solid overview and understanding of the book and its topic. ...`;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Organization': process.env.OPENAI_ORG_ID,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 1,
      }),
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();

    res.status(200).send(summary);
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).send('Error fetching book summary');
  }
};

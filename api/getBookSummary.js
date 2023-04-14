const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const bookTitle = req.query.title;

  if (!bookTitle) {
    return res.status(400).send('Book title is required.');
  }

  const prompt = `Write a concise summary of the book ${bookTitle}. Include the main topic or theme, key ideas or arguments presented, and key takeaways or conclusions. Summarize the author's background and qualifications, and provide a comparison to other books on the same subject. Also include the book's target audience or intended readership, its reception or critical response, and the publisher and first published date.`;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Organization': process.env.OPENAI_ORG_ID,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 4000,
        n: 1,
        stop: null,
        temperature: 1,
      }),
    });
    
if (!response.ok) {
      console.error('Error with OpenAI API call:', response.status, response.statusText);
      console.error('Response:', await response.text());
      return res.status(500).send('Error fetching book summary. Please try again later.');
    }

    const data = await response.json();
    const summary = data.choices[0].text.trim();
    return res.status(200).send(summary);
  } catch (error) {
    console.error('Error fetching book summary:', error);
    return res.status(500).send('Error fetching book summary. Please try again later.');
  }
};

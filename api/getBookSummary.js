const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const bookTitle = req.query.title;

  if (!bookTitle) {
    return res.status(400).send('Book title is required.');
  }

  const prompt = `Write a concise summary of ${bookTitle} that focuses on the most important takeaways and primary points from the book. Your summary should include the following:

Main topic or theme of the book
Key ideas or arguments presented
Brief summary of the main points covered in the book
Key takeaways or conclusions
To sum up: The main point or argument of the book in a brief summary.

Please keep in mind that the maximum context length for this model is 4096 tokens, so your prompt should not exceed this limit.`;

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

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const bookTitle = req.query.title;

  if (!bookTitle) {
    return res.status(400).send('Book title is required.');
  }

  const prompt = `Write a thorough yet concise summary of ${bookTitle}. Concentrate on only the most important takeaways and primary points from the book that together will give me a solid overview and understanding of the book and its topic. \n\nInclude all of the following in your summary: \n\n- Main topic or theme of the book\n- Key ideas or arguments presented\n- Chapter titles or main sections of the book with a paragraph on each\n- Key takeaways or conclusions\n- Author's background and qualifications\n- Comparison to other books on the same subject\n- Target audience or intended readership\n- Reception or critical response to the book\n- Publisher and First Published Date\n- Recommendations [Other similar books on the same topic]\n\nTo sum up:  **The book's biggest takeaway and point in a singular sentence**\n\n## Main topic or theme\n\n- \n\n## Key ideas or arguments presented\n\n- \n\n## Chapter titles or main sections of the book\n\n### \n\n- \n\n## Key takeaways or conclusions\n\n- \n\n## Author's background and qualifications\n\n- \n\n## Comparison to other books on the same subject\n\n- \n\n## Target audience or intended readership\n\n- \n\n## Reception or critical response to the book\n\n- \n\n## Publisher and First Published Date\n\n- \n\n## Recommendations\n\n...`;

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

    if (!response.ok) {
      console.error('Error with OpenAI API call:', response.statusText);
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


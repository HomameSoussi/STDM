const searchForm = document.getElementById('search-form');
const bookTitleInput = document.getElementById('book-title');
const bookSummary = document.getElementById('book-summary');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookTitle = bookTitleInput.value.trim();
    if (!bookTitle) return;

    const summary = await getBookSummary(bookTitle);
    bookSummary.innerHTML = summary;
});

async function getBookSummary(bookTitle) {
    // Call the OpenAI API here with the given prompt, replacing the bookTitle variable
    const prompt = `Write a thorough yet concise summary of ${bookTitle}. Concentrate on only the most important takeaways and primary points from the book that together will give me a solid overview and understanding of the book and its topic. ...`;

    // Replace with your API call
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            '

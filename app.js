const searchForm = document.getElementById('search-form');
const bookTitleInput = document.getElementById('book-title');
const bookSummary = document.getElementById('book-summary');
const loader = document.getElementById('loader');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bookTitle = bookTitleInput.value.trim();
  if (!bookTitle) return;

  loader.style.display = 'block';
  bookSummary.innerHTML = '';
  
  try {
    const summary = await getBookSummary(bookTitle);
    bookSummary.innerHTML = summary;
  } catch (error) {
    console.error('Error fetching book summary:', error);
    bookSummary.innerHTML = 'Error fetching book summary. Please try again later.';
  } finally {
    loader.style.display = 'none';
  }
});

async function getBookSummary(bookTitle) {
  try {
    const response = await fetch(`/api/getBookSummary?title=${encodeURIComponent(bookTitle)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const summary = await response.text();
    return summary;
  } catch (error) {
    console.error('Error fetching book summary:', error);
    throw error;
  }
}

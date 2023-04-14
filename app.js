const searchForm = document.getElementById('search-form');
const bookTitleInput = document.getElementById('book-title');
const bookSummary = document.getElementById('book-summary');
const spinner = document.getElementById('spinner');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bookTitle = bookTitleInput.value.trim();
  if (!bookTitle) return;

  showSpinner();

  const summary = await getBookSummary(bookTitle);
  hideSpinner();
  bookSummary.innerHTML = summary;
});

async function getBookSummary(bookTitle) {
  try {
    const response = await fetch(`/api/getBookSummary?title=${encodeURIComponent(bookTitle)}`);
    const summary = await response.text();
    return summary;
  } catch (error) {
    console.error('Error fetching book summary:', error);
    return 'Error fetching book summary. Please try again later.';
  }
}

function showSpinner() {
  spinner.classList.add('show');
}

function hideSpinner() {
  spinner.classList.remove('show');
}

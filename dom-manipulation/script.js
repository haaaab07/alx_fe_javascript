// Array of quote objects
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Motivation" },
  { text: "The way to get started is to quit talking and begin doing.", category: "Action" },
  { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to create the add quote form
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const newQuoteText = document.createElement('input');
  newQuoteText.id = 'newQuoteText';
  newQuoteText.type = 'text';
  newQuoteText.placeholder = 'Enter a new quote';

  const newQuoteCategory = document.createElement('input');
  newQuoteCategory.id = 'newQuoteCategory';
  newQuoteCategory.type = 'text';
  newQuoteCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  formContainer.appendChild(newQuoteText);
  formContainer.appendChild(newQuoteCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem('quotes', JSON.stringify(quotes));
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please enter both quote text and category.');
  }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial display of a random quote
showRandomQuote();

// Create the add quote form on page load
createAddQuoteForm();

// Load the last viewed quote from session storage if available
const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
if (lastViewedQuote) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>${lastViewedQuote.text}</p><p><em>${lastViewedQuote.category}</em></p>`;
}

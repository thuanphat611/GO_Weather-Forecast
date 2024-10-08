//Use localstorage to save temporary weather information history

const SEARCH_HISTORY_KEY = 'weatherSearchHistory';

// Remove items that have been saved for more than 1 day
const removeOldSearchesFromArray = (history) => {
  const now = new Date().getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  return history.filter(item => now - item.timestamp <= oneDayInMilliseconds);
};

// Get all search history from LocalStorage
const getSearchHistory = () => {
  const history = localStorage.getItem(SEARCH_HISTORY_KEY);
  const parsedHistory = history ? JSON.parse(history) : [];

  return removeOldSearchesFromArray(parsedHistory);
};

// Find a specific location in the search history
const findSearchInHistory = (searchTerm) => {
  let history = getSearchHistory();
  history = removeOldSearchesFromArray(history); // Remove old items before searching

  return history.find(item => item.name.toLowerCase() === searchTerm.toLowerCase());
};

// Add or replace an item in the search history
const addSearchToHistory = (newItem) => {
  newItem.timestamp = new Date().getTime();
  let history = getSearchHistory();
  history = removeOldSearchesFromArray(history); // Remove old items before adding new one

  const existingItemIndex = history.findIndex(item => item.name.toLowerCase() === newItem.name.toLowerCase());

  if (existingItemIndex !== -1) {
    // If the item already exists, replace it
    history[existingItemIndex] = newItem;
  } else {
    // If the item does not exist, add a new item
    history.push(newItem);
  }

  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
};

// Clear the search history
const clearSearchHistory = () => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};

export {
  findSearchInHistory,
  getSearchHistory,
  addSearchToHistory,
  clearSearchHistory,
}
module.exports = {
  format_date: (date) => {
    // console.log(date)
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  eq: (a, b) => {
    return a===b;
  },
};



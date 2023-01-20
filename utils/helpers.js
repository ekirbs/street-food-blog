// Handlebars.registerHelper('times', function(n, block) {
//   var accum = '';
//   for(var i = 0; i < n; ++i)
//       accum += block.fn(i);
//   return accum;
// });

// {{#times 10}}
//     <span>{{this}}</span>
// {{/times}

module.exports = {
  format_date: (date) => {
    console.log(date)
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

// {{format_date post.createdAt}}


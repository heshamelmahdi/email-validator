const Mailcheck = require("mailcheck");

function domainCheck(email) {
  return new Promise((resolve) => {
    Mailcheck.run({
      email: email,
      suggested: (suggestion) => {
        resolve({ valid: false, suggestion: suggestion.full });
      },
      empty: () => {
        resolve({ valid: true, suggestion: null });
      },
    });
  });
}

module.exports = domainCheck;

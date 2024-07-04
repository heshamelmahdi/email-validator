const dnsCheck = require("./src/dnsCheck");
const domainCheck = require("./src/domainCheck");
const validateRegex = require("./src/regex");

// this function will validate the email and
// return an object with the following:
// {
//    valid: (boolean) true/false,
//    error: (string | null) error message
//    suggestion: (string | null) the suggested email
// }
async function validateEmail(email) {
  const result = {
    valid: false,
    error: null,
    suggestion: null,
  };

  // Ensure that the email is not empty
  if (!email) {
    return { ...result, error: "Email cannot be empty" };
  }

  // Ensure that the email is a string
  if (typeof email !== "string") {
    return { ...result, error: "Email must be a string" };
  }

  // Ensure that the email matches the regex test
  if (!validateRegex(email)) {
    return { ...result, error: "Invalid email format" };
  }

  // Check the domain against common typos
  const domainCheckResult = await domainCheck(email);
  if (!domainCheckResult.valid) {
    return {
      ...result,
      error: "Invalid domain name",
      suggestion: domainCheckResult.suggestion,
    };
  }

  // Check the domain's MX records are valid
  const dnsCheckResult = await dnsCheck(email.split("@")[1]);
  if (!dnsCheckResult) {
    return {
      ...result,
      error: "Domain MX records not found",
    };
  }

  return { ...result, valid: true };
}

module.exports = validateEmail;

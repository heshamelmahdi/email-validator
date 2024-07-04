const validateEmail = require("../index");

// Tests a list of valid emails that should be successfully validated
const validEmail = {
  valid: true,
  error: null,
  suggestion: null,
};
test("Valid Emails", async () => {
  expect(await validateEmail("test@gmail.com")).toEqual(validEmail);
  expect(await validateEmail("some@hotmail.com")).toEqual(validEmail);
  expect(await validateEmail("first.last@mail.com")).toEqual(validEmail);
  expect(await validateEmail("email@outlook.com")).toEqual(validEmail);
  expect(await validateEmail("name@zoho.com")).toEqual(validEmail);
  expect(await validateEmail("test@yahoo.com")).toEqual(validEmail);
  expect(await validateEmail("test@intrazero.com")).toEqual(validEmail);
});

// Tests is the email is empty
const emptyEmailResult = {
  valid: false,
  error: "Email cannot be empty",
  suggestion: null,
};
test("Empty Email Fail", async () => {
  expect(await validateEmail(undefined)).toEqual(emptyEmailResult);
  expect(await validateEmail(null)).toEqual(emptyEmailResult);
  expect(await validateEmail("")).toEqual(emptyEmailResult);
});

// Tests if the email is not a string
const notStringResult = {
  valid: false,
  error: "Email must be a string",
  suggestion: null,
};
test("Not String Email", async () => {
  expect(await validateEmail(123)).toEqual(notStringResult);
  expect(await validateEmail(true)).toEqual(notStringResult);
  expect(await validateEmail(2.5)).toEqual(notStringResult);
});

// Tests if the email does not match the regex test
const regexFailResult = {
  valid: false,
  error: "Invalid email format",
  suggestion: null,
};
test("Regex Check Fail", async () => {
  expect(await validateEmail("test @gmail.com")).toEqual(regexFailResult);
  expect(await validateEmail("some@@gmail.com")).toEqual(regexFailResult);
  expect(await validateEmail("some@gmail")).toEqual(regexFailResult);
  expect(await validateEmail("some@.com")).toEqual(regexFailResult);
});

// Tests if the domain check fails for gmail
const gmailDomainCheckFail = {
  valid: false,
  error: "Invalid domain name",
  suggestion: "test@gmail.com",
};
test("Gmail Domain Fail", async () => {
  expect(await validateEmail("test@gnail.com")).toEqual(gmailDomainCheckFail);
  expect(await validateEmail("test@gmaill.com")).toEqual(gmailDomainCheckFail);
  expect(await validateEmail("test@gmil.com")).toEqual(gmailDomainCheckFail);
  expect(await validateEmail("test@gmal.com")).toEqual(gmailDomainCheckFail);
});

// Tests if the domain check fails for hotmail
const hotmailDomainCheckFail = {
  valid: false,
  error: "Invalid domain name",
  suggestion: "test@hotmail.com",
};
test("Hotmail Domain Fail", async () => {
  expect(await validateEmail("test@heotmail.com")).toEqual(
    hotmailDomainCheckFail
  );
  expect(await validateEmail("test@hotmaill.com")).toEqual(
    hotmailDomainCheckFail
  );
  expect(await validateEmail("test@hotmil.com")).toEqual(
    hotmailDomainCheckFail
  );
});

// Tests if the domain check fails for outlook
const outlookDomainCheckFail = {
  valid: false,
  error: "Invalid domain name",
  suggestion: "test@outlook.com",
};
test("Outlook Domain Fail", async () => {
  expect(await validateEmail("test@outlookk.com")).toEqual(
    outlookDomainCheckFail
  );
  expect(await validateEmail("test@outlok.com")).toEqual(
    outlookDomainCheckFail
  );
  expect(await validateEmail("test@otlook.com")).toEqual(
    outlookDomainCheckFail
  );
});

// Tests if the domain check fails for yahoo
const yahooDomainCheckFail = {
  valid: false,
  error: "Invalid domain name",
  suggestion: "test@yahoo.com",
};
test("Yahoo Domain Fail", async () => {
  expect(await validateEmail("test@yahooo.com")).toEqual(yahooDomainCheckFail);
  expect(await validateEmail("test@yaho.com")).toEqual(yahooDomainCheckFail);
  expect(await validateEmail("test@yaoo.com")).toEqual(yahooDomainCheckFail);
});

// Tests if the domain contains valid MX records
const mxRecordFail = {
  valid: false,
  error: "Domain MX records not found",
  suggestion: null,
};
test("Invalid MX Records", async () => {
  expect(await validateEmail("test@intrazeroo.com")).toEqual(mxRecordFail);
  expect(await validateEmail("test@nonexistant.com")).toEqual(mxRecordFail);
});

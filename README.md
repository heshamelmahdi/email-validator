
# Simple Email Validator

This package contains a validateEmail(email) function which checks the email against the following: 1. Regex to confirm email is valid format, 2. checks common domain typos, and 3. DNS records to ensure MX records exist on the domain.

Note: package has been tested in NodeJS, not the browser

## Installation

Install email-validator with npm

```bash
  cd email-validator
  npm install
```
    
## Usage/Examples

```javascript
import validateEmail from 'email-validator'

const validation = await validateEmail(email)

// validation is an object of format:
// {
//    valid: (boolean) true/false,
//    error: (string | null) error message
//    suggestion: (string | null) the suggested email if the domain contained a known typo
// }
```

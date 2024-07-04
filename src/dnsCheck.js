const dns = require("dns");

async function dnsCheck(domain) {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err) {
        resolve(null);
      } else {
        resolve(addresses.sort((a, b) => a.priority - b.priority));
      }
    });
  });
}

module.exports = dnsCheck;

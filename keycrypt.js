const cipher = 'dont.talk.about.kite.club';

function encrypt(str) {
  return CryptoJS.AES.encrypt(str, cipher).toString();
}

function decrypt(str) {
  return CryptoJS.AES.decrypt(str, cipher).toString(CryptoJS.enc.Utf8);
}

var gibberish = {};

for (api in secrets) {
  gibberish[api] = {};
  for (item in secrets[api])
    if (Array.isArray(secrets[api][item])) {
      // Encrypt multiple keys.
      gibberish[api][item] = [];
      for (var i = 0; i < secrets[api][item].length; ++i)
        gibberish[api][item].push(encrypt(secrets[api][item][i]));
    } else {
      // Encrypt one key.
      gibberish[api][item] = encrypt(secrets[api][item]);
    }
}

console.log('gibberish:');
console.log(JSON.stringify(gibberish, null, 4));

var el = document.createElement('h1');
el.innerHTML = 'Your gibberish:';
document.body.appendChild(el);
var em = document.createElement('pre');
document.body.appendChild(em);
el = document.createElement('code');
el.innerHTML = JSON.stringify(gibberish, null, 4);
em.appendChild(el);

decrypted = {};
for (api in gibberish) {
  decrypted[api] = {};
  for (item in gibberish[api])
    if (Array.isArray(gibberish[api][item])) {
      // Encrypt multiple keys.
      decrypted[api][item] = [];
      for (var i = 0; i < gibberish[api][item].length; ++i)
        decrypted[api][item].push(decrypt(gibberish[api][item][i]));
    } else {
      // Encrypt one key.
      decrypted[api][item] = decrypt(gibberish[api][item]);
    }
}

console.log('decrypted:');
console.log(JSON.stringify(decrypted, null, 4));
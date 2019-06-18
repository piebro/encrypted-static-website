var openpgp = require('openpgp');
var base64ArrayBuffer = require('base64-arraybuffer');
var fs = require('fs');

async function encrypt(text, password){
  const options = {
    message: openpgp.message.fromText(text),
    passwords: [password],  // multiple passwords possible
    armor: false
  };

  return openpgp.encrypt(options).then(function(ciphertext) {
    return ciphertext.message.packets.write();
  });
}

async function decrypt(encryptedText, password){
  const options = {
    message: await openpgp.message.read(encryptedText), // parse encrypted bytes
    passwords: [password],                  // decrypt with password
    format: 'utf8'                          // output as Uint8Array
  };

  return openpgp.decrypt(options).then(function(plaintext) {
      return plaintext.data
  })
}

async function main(){
  const type = process.argv[2];
  const inputPath = process.argv[3];
  const outputPath = process.argv[4];
  const password1 = process.argv[5];
  const password2 = process.argv[6];


  if(type === "encrypt"){
    if(password1 !== password2){
      console.log("The passwords are not the same")
      return;
    }
    const text = fs.readFileSync(inputPath, {encoding: 'utf-8'})
    let enc = base64ArrayBuffer.encode(await encrypt(text, password1));
    fs.writeFileSync(outputPath, "secret=\""+ enc + "\";")
  } else if(type === "decrypt"){
    let text = fs.readFileSync(inputPath, {encoding: 'utf-8'})
    text = text.substr(8, text.length-10);
    const dec = await decrypt(new Uint8Array(base64ArrayBuffer.decode(text)),password1);
    fs.writeFileSync(outputPath, dec)
  }
   
}

main()
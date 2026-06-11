const fs = require('fs');
const path = './src/data/mockData.js';
let content = fs.readFileSync(path, 'utf8');
let counter = 100001;
content = content.replace(/id: "apt-\d+",/g, match => `${match}\n    code: "${counter++}",`);
fs.writeFileSync(path, content);
console.log('Done!');

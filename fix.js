const fs = require('fs');

const files = ['index.html', 'admin.html'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const newContent = content.replace(/â€“/g, '-').replace(/–/g, '-').replace(/\?"/g, '-').replace(//g, '-');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed ' + file);
  } else {
    console.log('No weird dashes found in ' + file);
  }
});

const fs = require('fs');
const process = require('process');

function cat() {
    let arg = process.argv[2];
    fs.readFile(arg, 'utf-8', function(err, data) {
        if (err) {
            console.log(`ERROR: ${err}`);
            process.exit(1);
        }
        else {
            console.log(data);
        }
    })
}

cat();
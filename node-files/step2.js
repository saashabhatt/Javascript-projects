const fs = require('fs');
const axios = require('axios')
const process = require('process');
let arg = process.argv[2];

try {
    new URL(arg);
    webcat();
} catch {
    cat();
}

function cat() {
    
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

function webcat() {
    let arg = process.argv[2];
    axios.get(arg)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Error: ${err}`))
}


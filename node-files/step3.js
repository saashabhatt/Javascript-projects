const fs = require('fs');
const axios = require('axios')
const process = require('process');

if (process.argv[2] === '--out') {
    try {
        new URL(process.argv[4]);
        webCatWrite();
    } catch {
        catWrite();
    }
} else {
    try {
        new URL(process.argv[2]);
        webcat();
    } catch {
        cat();
    }
}

function cat(arg = process.argv[2]) {
    fs.readFile(arg, 'utf-8', function(err, data) {
        if (err) {
            console.log(`ERROR: ${err}`);
            process.exit(1);
        }
        else {
            console.log(data);
            return data;
        }
    })
}

function webcat(arg = process.argv[2]) {
    axios.get(arg)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Error: ${err}`))
}


function webCatWrite() {
    let writefile = process.argv[3];
    axios.get(process.argv[4])
        .then(res => fs.writeFile(writefile, res.data, {encoding:'utf-8', flags:'--out'}, function(err) {
            if(err) {
                console.log(err)
                process.kill(1);
            }
            console.log('Operation performed successfully');
        }))
        .catch(err => console.log(`Error: ${err}`))
}

function catWrite() {
    const origin = fs.createReadStream(process.argv[4]);
    const destination = fs.createWriteStream(process.argv[3]);
    origin.pipe(destination);
}

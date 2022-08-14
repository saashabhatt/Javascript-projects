// Part 1
// 1
let baseurl = "http://numbersapi.com"
let favNumber = 7;

axios.get(`${baseurl}/${favNumber}?json`)
    .then(res => console.log(res.data));

// 2
let nums = [5, 6, 7];
axios.get(`${baseurl}/${nums}?json`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

// 3
let fourfacts = [];

for (let i=0; i<4; i++) {
    fourfacts.push(axios.get(`${baseurl}/${favNumber}?json`))
};

Promise.all(fourfacts)
    .then(factsarray => (
        factsarray.forEach(res => $("body").append(`<p>${res.data.text}</p>`))
    ))

// Part 2
// 1
drawcardsurl = "http://deckofcardsapi.com/api/deck/new/draw/?count=1"

axios.get(`${drawcardsurl}`)
    .then(res => console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`));

// 2 
let twocards = [];
for (let i=0; i<2; i++) {
    twocards.push(axios.get(`${drawcardsurl}`))
}

Promise.all(twocards)
    .then(cardarray => (
        cardarray.forEach(res => console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`))
    ))




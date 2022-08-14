let deckid;
const cardsurl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let drawcardsurl;
let imglink;

// Get deck id and draw card
async function getid() {
    let deckobj = await axios.get(`${cardsurl}`)
    deckid = deckobj.data.deck_id;
    drawcardsurl= `http://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`;
    let cardobj = await axios.get(`${drawcardsurl}`);
    return imglink = cardobj.data.cards[0].image;
}

// Append to dom
$("button").on("click", function() {
    getid();
    
    let $newimg = $("<img>");
    $newimg.attr("src", imglink);
    $("body").append($newimg);
})



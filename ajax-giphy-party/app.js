let $inpt = $("#searchstring");
let clickevt = $("#sear");


function appendtobody (item) {
        let cont = document.getElementById("displayarea");
        let img = document.createElement('img');
        img.src = item.images.original.url;
        img.setAttribute("alt", "gif")
        cont.append(img);
    }

clickevt.on("click", async function(e) {
    e.preventDefault();
    let term = $inpt.val();
    let getitem = await axios.get('http://api.giphy.com/v1/gifs/search', { params: 
    { api_key: 'iwHNN1ntnVefpGES4PDY0EEPQcuScqt1', q: term }});
    let dataArraylen = getitem.data.data.length;
    let randobj = Math.floor(Math.random() * dataArraylen)
    appendtobody(getitem.data.data[randobj]);
});


$("button").on("click", function() {
    $("#displayarea").empty();
})
// When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”
$(document).ready(console.log("Let’s get ready to party with jQuery!"))

//Give all images inside of an article tag the class of image-center 
//(this class is defined inside of the style tag in the head).
$('article img').addClass('image-center');

//Remove the last paragraph in the article.
$('article p').last().remove();

//Set the font size of the title to be a random pixel size from 0 to 100.
let num = Math.floor(Math.random()*100) + "px";
$('h1').css('font-size', num);

//Add an item to the list; it can say whatever you want.
$('ol').append('<li>I am new here</li>')

//Scratch that; the list is silly. Empty the aside and 
//put a paragraph in it apologizing for the list’s existence.
$('aside').empty()
.append($("<p>", {text: "Sorry about that list"}));

//When you change the numbers in the three inputs on the bottom, the background color of the body 
//should change to match whatever the three values in the inputs are.
$(".form-control").on("keyup blur change", function() {
const red = $('input').eq(0).val();
const blue = $('input').eq(1).val();
const green = $('input').eq(2).val();
$('body').css('background-color', `rgb(${red}, ${blue}, ${green})`);
});

//Add an event listener so that when you click on the image, it is removed from the DOM.
$('img').on('click', function() {
    $('img').remove();
})
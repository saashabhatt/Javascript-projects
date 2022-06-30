// categories is the main data structure for the app; it looks like this:
const num_of_cat = 6;
const num_of_clues = 5;

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get("https://jservice.io/api/categories", {params: {count: 100}} );
    let iteresres = res.data;
    let allCatIds = iteresres.map(function(category) {
        return category.id;
    });
    return (_.sampleSize(allCatIds, num_of_cat));
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let res = await axios.get("https://jservice.io/api/category", { params: {id: catId} });
    let dat = res.data;
    let randomize = _.sampleSize(dat.clues, num_of_clues);
    let clue_array = randomize.map(function(item) {
        return {
            question: item.question,
            answer: item.answer,
            showing: null
        }
    });
    return {
        title: dat.title,
        clue_array
    }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    $("#jeopardy thead").empty();
    let $thr = $("<tr>");
    for (let catindex = 0; catindex <num_of_cat; catindex++) {
        $thr.append($("<th>").text(categories[catindex].title));
    }
    $("thead").append($thr);
    
    $("#jeopardy tbody").empty();
    for (let row=0; row < num_of_clues; row++) {
        let tbr = $("<tr>");
        for (catindex = 0; catindex <num_of_cat; catindex++) {
            tbr.append($("<td>").attr("id", `${catindex}-${row}`).text("?"));
        }
        $("#jeopardy tbody").append(tbr);
    }   
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let id = evt.target.id;
    let [catidx, clueidx] = id.split("-");
    let clue = categories[catidx].clue_array[clueidx];
    let inntext;

    if (!clue.showing) {
        inntext = clue.question;
        clue.showing = "question";
    }
        else if (clue.showing === "question") {
            inntext = clue.answer;
            clue.showing = "answer"
        }
        else {
            return;
        }
    $(`#${catidx}-${clueidx}`).html(inntext);
    
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    let catids = await getCategoryIds();
    categories = [];

    for (let i=0; i < catids.length; i++) {
        let elem = await getCategory(catids[i]);
        categories.push(elem);
    }
    fillTable();
}

/** On click of start / restart button, set up game. */

$("#restart").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */
$(function() {
        $("#jeopardy").on("click", "td", handleClick);
}
);
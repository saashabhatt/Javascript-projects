

const missing_url = "http://tinyurl.com/missing-tv";
const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
let $searchterm = $("#search-query");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  term = $searchterm.val();
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
  let iterres = res.data;
  let shows = iterres.map(function(series) {
      return {
      id: series.show.id,
      name: series.show.name,
      summary: series.show.summary,
      image: series.show.image? series.show.image.medium : missing_url
    }
  });
  return shows;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-6 col-lg-3">
          <div class="card" data-show-id="${show.id}">
           <img class="card-img-top" src="${show.image}">
           <div class="media-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary get-episodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

$searchForm.on("submit", async function searchForShowAndDisplay (evt) {
  evt.preventDefault();
  const term = $searchterm.val();
  $episodesArea.hide();
  const shows = await getShowsByTerm(term);
  populateShows(shows);
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  let iterres = res.data;
  let episodes = iterres.map(function(epi) {
    return {
    id: epi.id,
    name: epi.name,
    season: epi.season,
    number: epi.number
  }
});
return episodes;
}

//Add episode name, season and number in a list and reveal the list area

function populateEpisodes(episodes) { 
  let $lst = $("#episodes-list");
  $lst.empty();

  for (let episode of episodes) {
    const $sequence = $(
      `<li>Title - ${episode.name}, season ${episode.season}, number ${episode.number}</li>`
    );
    $lst.append($sequence);
  }
  $episodesArea.show();
}

//Handle elements to populate the DOM on click
$("#shows-list").on("click",".get-episodes", async function handleclick (e) {
  let showid = $(e.target).closest(".Show").data("show-id");
  let episodes = await getEpisodesOfShow(showid);
  populateEpisodes(episodes);
});

console.log("hello");
// removes songs that have already been searched, keeping search current.
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
    // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  }
}

// const resultsDiv = document.querySelector("#results");
const siteDiv = document.querySelector("#album");
// defining variable and connecting to html
const form = document.querySelector("#search");
const audioEl = document.querySelector("#previewMusic audio");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // adding listener to click or enter
  let inputBox = document.querySelector("#artistsearch");
  console.log(inputBox.value);

  removeAllChildNodes(siteDiv);

  fetch(
    `https://proxy-itunes-api.glitch.me/search?term=${inputBox.value}&media=music`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //
      if (data.resultCount === 0) {
        console.log("no results");
        let noResultsDiv = document.createElement("div");
        noResultsDiv.innerText = "No results found. Please try again.";
        noResultsDiv.classList.add("noResults");
        siteDiv.appendChild(noResultsDiv);
        return;
      }

      for (let i of data.results) {
        console.log(i);

        let bandDiv = document.createElement("div");
        bandDiv.classList.add("band");

        let artistDiv = document.createElement("div");
        artistDiv.classList.add("artist");
        artistDiv.innerText = i.artistName;
        bandDiv.appendChild(artistDiv);
        console.log(i.artistName);

        let imageEl = document.createElement("img");
        imageEl.src = i.artworkUrl100;
        imageEl.classList.add("art");
        bandDiv.appendChild(imageEl);

        let albumDiv = document.createElement("div");
        albumDiv.classList.add("album");
        albumDiv.innerText = i.collectionName;
        bandDiv.appendChild(albumDiv);

        let trackDiv = document.createElement("div");
        bandDiv.appendChild(trackDiv);

        let previewDiv = document.createElement("a");
        previewDiv.classList.add("previewLink");
        previewDiv.href = `${i.trackViewUrl}`;
        previewDiv.innerText = i.trackName;
        previewDiv.addEventListener("click", (event) => {
          event.preventDefault();
          audioEl.src = i.previewUrl;
          audioEl.play();
        });
        bandDiv.appendChild(previewDiv);

        siteDiv.appendChild(bandDiv);
      }
    })
    // attaches a callback when a promise is rejected
    .catch((err) => {
      console.log("error here");
      let errorDiv = document.createElement("div");
      errorDiv.innerText =
        "Ooops, something went wrong. Please try again later.";
      errorDiv.classList.add("errorMessage");
      siteDiv.appendChild(errorDiv);
      return;
    });
});

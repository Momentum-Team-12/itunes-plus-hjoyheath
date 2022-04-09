let siteDiv = document.querySelector("#album");

fetch("https://proxy-itunes-api.glitch.me/search?term=TOOL&media=music", {
  method: "GET",
  headers: {},
})
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (data) {
    // console.log(data);

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
      trackDiv.classList.add("track");
      bandDiv.appendChild(trackDiv);

      let previewDiv = document.createElement("a");
      previewDiv.href = `${i.trackViewUrl}`;
      previewDiv.innerText = i.trackName;
      bandDiv.appendChild(previewDiv);

      siteDiv.appendChild(bandDiv);
    }
  });

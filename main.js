let siteDiv = document.querySelector("#album");

fetch("https://itunes.apple.com/search?term=TOOL&media=music", {
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

      let artistDiv = document.createElement("p");
      artistDiv.classList.add("artist");
      artistDiv.innerText = i.artistName;
      bandDiv.appendChild(artistDiv);
      console.log(i.artistName);

      let albumDiv = document.createElement("div");
      albumDiv.classList.add("album");
      albumDiv.innerText = i.collectionName;
      bandDiv.appendChild(albumDiv);

      let trackDiv = document.createElement("div");
      bandDiv.appendChild(trackDiv);

      let previewDiv = document.createElement("a");
      previewDiv.href = `${i.trackViewUrl}`;
      previewDiv.innerText = i.trackName;
      bandDiv.appendChild(previewDiv);

      let imageEl = document.createElement("img");
      imageEl.src = i.artworkUrl60;
      bandDiv.appendChild(imageEl);
      siteDiv.appendChild(bandDiv);
    }
  });

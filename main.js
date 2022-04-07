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
      let artistDiv = document.createElement("p");
      artistDiv.classList.add("artist");
      artistDiv.innerText = i.artistName;
      siteDiv.appendChild(artistDiv);
      console.log(i.artistName);

      let albumDiv = document.createElement("div");
      albumDiv.innerText = i.collectionName;
      siteDiv.appendChild(albumDiv);

      let trackDiv = document.createElement("div");
      siteDiv.appendChild(trackDiv);

      let previewDiv = document.createElement("a");
      previewDiv.href = `${i.trackViewUrl}`;
      previewDiv.innerText = i.trackName;
      siteDiv.appendChild(previewDiv);

      let imageEl = document.createElement("img");
      imageEl.src = i.artworkUrl60;
      siteDiv.appendChild(imageEl);
    }
  });

fetch(
  "https://itunes.apple.com/search?term=lateralus&entity=musicTrack&limit=16",
  {
    method: "GET",
    headers: {},
  }
).then(function (response) {
  console.log(response);
  return response.json();
});

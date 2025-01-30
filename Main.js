const APIKEY = 'Lo2UvSSK7OqIo92KON44COUBmhDygoSN'
const outputArea = document.getElementById("outputArea");
let offset = 0;
const pageSize = 12;

function handleRandomClick() {
  let url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((randomJsonData) => {
      let gifUrl = randomJsonData.data.images.fixed_height.url;
      outputArea.innerHTML = `<div><img src="${gifUrl}"></div>`;
    })
    .catch((error) => {
      console.error("Error fetching GIF:", error);
      outputArea.innerHTML = `<p>Failed to load GIF.</p>`;
    });
}

function handleTranslateClick() {
  let query = document.getElementById("searchInput").value;
  let gifUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${APIKEY}&s=${query}`
  if (query) {
    fetch(gifUrl)
      .then((response) => response.json())
      .then((translateJsonData) => {
        gifUrl = translateJsonData.data.images.fixed_height.url;
        outputArea.innerHTML = `<div><img src="${gifUrl}"></div>`;
      })
      .catch((error) => {
        console.log("Error fetching GIF:", error);
        outputArea.innerHTML = `<p>Failed to load GIFs.</p>`;
      });
  } else {
    alert("Please type something to search!");
  }
}

function handleSearchClick() {
  let query = document.getElementById("searchInput").value;
  let url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${APIKEY}&limit=${pageSize}&offset=${offset}`

  if (query === "") {
    alert("Please type something to search!");
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((searchJsonData) => {
      const gifs = searchJsonData.data;
      const processedResponse = gifs
        .map(
          (gif) => `
        <div class="grid-item">
          <img src="${gif.images.fixed_height.url}" />
        </div>
      `
        )
        .join('');
      outputArea.innerHTML = processedResponse;     
    })
    .catch((error) => {
      console.error("Error fetching GIF:", error);
      outputArea.innerHTML = `<p>Failed to load GIFs.</p>`;
    });
}

function offsetIncrease() {
  const decreaseButton = document.getElementById('disabled');
  offset += pageSize;
  handleSearchClick();

  if (offset > 0) {
    decreaseButton.disabled = false;
  }
}

function offsetDecrease() {
  const decreaseButton = document.getElementById('disabled');
  if (offset >= pageSize) {
    offset -= pageSize;
    handleSearchClick();

    if (offset === 0) {
      decreaseButton.disabled = true;
    }
  }
}

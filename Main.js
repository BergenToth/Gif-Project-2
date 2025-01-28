
function handleRandomClick() {
  let outputArea = document.getElementById('outputArea');

  let url = `http://api.giphy.com/v1/gifs/random?api_key=Lo2UvSSK7OqIo92KON44COUBmhDygoSN`;

  fetch(url)
    .then((response) => response.json())
    .then((randomJsonData) => {
      let url = randomJsonData.data.images.fixed_height.url;
      let out = `<div><img src='${url}'></img></div>`;
      outputArea.innerHTML = out;
    });
}

function handleTranslateClick() {
  const query = document.getElementById('searchInput').value;

  if (query) {
    fetch(
      `http://api.giphy.com/v1/gifs/translate?api_key=Lo2UvSSK7OqIo92KON44COUBmhDygoSN&s=${query}`
    )
      .then((response) => response.json())
      .then((translateJsonData) => {
        const outputArea = document.getElementById('outputArea');
        url = translateJsonData.data.images.fixed_height.url;
        outputArea.innerHTML = `<img src="${url}">`;
      })
      .catch((error) => {
        console.log('Error fetching GIF:', error);
        outputArea.innerHTML = `<p>Failed to load GIFs.</p>`;
      });
  } else {
    alert('Please type something to search!');
  }
}

let offset = '';
const pageSize = 10;

function handleSearchClick() {
  let query = document.getElementById('searchInput').value;

  if (query === '') {
    alert('Please type something to search!');
  }

  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=Lo2UvSSK7OqIo92KON44COUBmhDygoSN&limit=${pageSize}&offset=${offset}`
  )
    .then((response) => response.json())
    .then((searchJsonData) => {
      const gifs = searchJsonData.data;
      const processedResponse = gifs
        .map(
          (gif) => `
        <div style="display: inline-block; text-align: center;">
          <img src="${gif.images.fixed_height.url}" alt="${gif.title}" />
        </div>
      `
        )
        .join('');
      outputArea.innerHTML = processedResponse;
    })
    .catch((error) => {
      console.error('Error fetching GIF:', error);
      outputArea.innerHTML = `<p>Failed to load GIFs.</p>`;
    });
}

function offsetIncrease() {
  offset += pageSize;
  handleSearchClick();
}

function offsetDecrease() {
  if (offset >= pageSize) {
    offset -= pageSize;
    handleSearchClick();
  }
}
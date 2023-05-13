function getUser () {
    return JSON.parse(localStorage.getItem("user"));
}

function favorite (favorite_id, isFavorited) {
  const { id: userId } = getUser();

  // if isFavorited is true, delete the favorite
  if (isFavorited) {
    fetch(`/favorites/delete`, {
      method: "DELETE",
      mode: "no-cors",
      body: new URLSearchParams({
        favorite_id,
        user_id: userId
      })
    })
      .then((data) => {
        // data = 1
        if (data === 1) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // TODO handle error
      });
  } else {
    // if isFavorited is false, create the favorite
    fetch(`/favorites/new`, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({
        favorite_id,
        user_id: userId
      })
    })
      .then((data) => {
        if (data === 1) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // TODO handle error
      });
  }
}

function favoritesInit() {
  const liked = "♥️";
  const unliked = "♡";
  const resultsContainer = document.querySelector("#results-container");

  // TODO: show off this "disabled" bit (disable clicking the button over again, showing the user the "unline" before page reload)
  const handleFavoriteClick = (event) => {
    if (event.target.classList.contains("favorite-button")) {
      const button = event.target;
      button.disabled = true;
      button.classList.add("disabled");

      const favorite_id = button.dataset.favoriteId;
      let isFavorited = button.dataset.isFavorited || false;

      favorite(favorite_id, isFavorited);

      if (isFavorited) {
        button.innerText = unliked;
        button.dataset.isFavorited = false;
        isFavorited = false;
      } else {
        button.innerText = liked;
        button.dataset.isFavorited = true;
        isFavorited = true;
      }

      button.disabled = false;
      button.classList.remove("disabled");
    }
  }
  resultsContainer.addEventListener("click", handleFavoriteClick);
}

document.addEventListener("DOMContentLoaded", favoritesInit);
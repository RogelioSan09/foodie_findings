function favorite (favorite_id, isFavorited) {
  const { id: userId } = getUser();

  // if isFavorited is true, delete the favorite
  if (isFavorited) {
    fetch(`/favorites/delete`, {

      method: "DELETE",
      body: {
        favorite_id,
        user_id: userId
      }
    })
      .then((response) => response.json())
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
      body: {
        favorite_id,
        user_id: userId
      }
    })
      .then((response) => response.json())
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
  const resultsContainer = document.querySelector("#results-container");

  const liked = "♥️";
  const unliked = "♡";
  // TODO: show off this "disabled" bit (disable clicking the button over again, showing the user the "unline" before page reload)
  const handleFavoriteClick = async (event) => {
    if (event.target.classList.contains("favorite-button")) {
      const button = event.target;
      button.disabled = true;
      button.classList.add("disabled");

      const favorite_id = button.dataset.favoriteId;
      const isFavorited = button.dataset.isFavorited;

      if (isFavorited) {
        button.innerText = unliked;
      } else {
        button.innerText = liked;
      }

      await favorite(favorite_id, isFavorited);
      button.disabled = false;
      button.classList.remove("disabled");
    }

    resultsContainer.addEventListener("click", handleFavoriteClick);
  }
}

document.addEventListener("DOMContentLoaded", favoritesInit);
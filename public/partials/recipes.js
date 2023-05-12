const recipesTemplate = `{{#if recipes}}
  {{#each recipes}}
      <div class="recipe-card">
          <h3>
              <a href="{{this.sourceUrl}}" target="_blank">
                  {{this.title}}
              </a>
          </h3>
          <a href="{{this.sourceUrl}}" target="_blank">
              <img style="width: 100%; max-width: 300px; height: auto;" class="recipe-image" src="{{this.image}}" alt="" />
          </a>
          <p>Ready in {{this.readyInMinutes}} minutes</p>
          <button 
            class="favorite-button" 
            data-is-favorited="{{this.isFavorited}}" 
            data-favorite-id="{{this.id}}"
          >
            {{#if this.isFavorited}}♥️{{else}}♡{{/if}}
          </button>
      </div>
  {{/each}}
{{else}}
    <p>No recipes found</p>
{{/if}}`;

export default recipesTemplate;
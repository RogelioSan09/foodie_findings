const restaurantPartial = `{{#if restaurants}}
  {{#each restaurants}}
      <div class="restaurant-card">
          <h3>
              <a href="{{this.url}}" target="_blank">
                  {{this.name}}                    
              </a>
          </h3>
          <a href="{{this.url}}" target="_blank">
              <img style="width: 100%; max-width: 300px; height: auto;" class="restaurant-image" src="{{this.image_url}}" alt="" />
          </a>
          <p>{{this.distanceInMiles}} miles away</p>
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
    <p>No restaurants found</p>
{{/if}}`;

export default restaurantPartial;
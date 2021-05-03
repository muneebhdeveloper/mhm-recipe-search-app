import View from './view.js';
import icons from 'url:../../img/icons.svg';
let Fraction = require('fractional').Fraction;

class SearchView extends View {
  _parentElement = document.querySelector('.search-results');
  _data;
  _errorMessage = 'Recipe not found, search for another one';
  _successMessage = '';
  _searchForm = document.querySelector('.search');

  _generateMarkup() {
    return `
    <ul class="results">
    ${this._data
      .map(recipe => {
        return `
        <li class="preview">
        <a
            class="preview__link ${
              window.location.hash.slice(1) === recipe.id
                ? 'preview__link--active'
                : ''
            }"
            href="#${recipe.id}"
        >
            <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            </div>
        </a>
        </li>
        `;
      })
      .join('')}
    </ul>
  `;
  }

  addHandlerSearch(handler) {
    this._searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      this.querySelector('.search__field').value = '';
      handler();
    });
  }
}

export default new SearchView();

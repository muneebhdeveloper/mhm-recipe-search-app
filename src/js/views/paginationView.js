import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;
  _errorMessage = '';
  _successMessage = '';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const targetBtn = event.target.closest('.btn--inline');
      if (!targetBtn) return;
      const targetPage = +targetBtn.dataset.goto;
      handler(targetPage);
    });
  }

  _generateMarkup() {
    // Other pages
    if (
      this._data.currentPage > 1 &&
      this._data.currentPage < this._data.pagesCount
    ) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.currentPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.currentPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next" data-goto="${
      this._data.currentPage + 1
    }">
      <span>Page ${this._data.currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
          `;
    }

    // Page 1, and more pages
    if (
      this._data.pagesCount > 1 &&
      this._data.currentPage !== this._data.pagesCount
    ) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.currentPage + 1
      }">
      <span>Page ${this._data.currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
          `;
    }

    // Last page
    if (
      this._data.pagesCount > 1 &&
      this._data.currentPage === this._data.pagesCount
    ) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.currentPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.currentPage - 1}</span>
    </button>
          `;
    }

    return '';
  }

  //   addHandlerRender(handler) {
  //     ['hashchange', 'load'].forEach(event => {
  //       window.addEventListener(event, handler);
  //     });
  //   }
}

export default new PaginationView();

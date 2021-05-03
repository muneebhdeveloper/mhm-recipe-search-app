class SearchFieldView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value + '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
      this.querySelector('.search__field').value = '';
    });
  }
}

export default new SearchFieldView();

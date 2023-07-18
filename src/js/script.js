class BooksList {
  constructor() {
    this.data = [];
    this.favoriteBooks = [];
    this.filters = [];
    this.templateSource = document.getElementById("template-book").innerHTML;
    this.template = Handlebars.compile(this.templateSource);
    this.booksList = document.querySelector(".books-list");

    this.initData(); // Inicjalizacja danych książek z dataSource
    this.getElements(); // Pobranie referencji do elementów DOM
    this.initActions(); // Inicjalizacja nasłuchiwaczy zdarzeń
    this.render(); // Wygenerowanie widoku aplikacji
  }

  // Inicjalizacja danych książek z dataSource
  initData() {
    this.data = dataSource.books;
  }

  // Pobranie referencji do elementów DOM
  getElements() {
    this.form = document.querySelector(".filters");
  }

  // Inicjalizacja nasłuchiwaczy zdarzeń
  initActions() {
    this.form.addEventListener("change", () => this.filterBooks()); // Nasłuchiwanie na zmiany checkboxów filtrów
    this.booksList.addEventListener("click", (event) => this.handleBookClick(event)); // Nasłuchiwanie na kliknięcie w obrazek książki
  }

  // Obsługa kliknięcia na obrazek książki
  handleBookClick(event) {
    event.preventDefault();
    const clickedElement = event.target;

    if (clickedElement.classList.contains("book__image")) {
      const bookId = clickedElement.getAttribute("data-id");
      const isFavorite = this.favoriteBooks.includes(bookId);

      if (!isFavorite) {
        clickedElement.classList.add("favorite");
        this.favoriteBooks.push(bookId);
      } else {
        const index = this.favoriteBooks.indexOf(bookId);
        this.favoriteBooks.splice(index, 1);
        clickedElement.classList.remove("favorite");
      }
    }
  }

  // Filtracja książek na podstawie wybranych filtrów
  filterBooks() {
    // Pobranie wybranych wartości filtrów
    this.filters = Array.from(this.form.querySelectorAll('input[name="filter"]:checked')).map((input) => input.value);

    this.data.forEach((book) => {
      const shouldBeHidden = this.filters.some((filter) => !book.details[filter]);
      const bookImage = this.booksList.querySelector(`.book__image[data-id="${book.id}"]`);

      if (bookImage) {
        // Dodanie lub usunięcie klasy 'hidden' tylko jeśli element został znaleziony
        if (shouldBeHidden) {
          bookImage.classList.add("hidden");
        } else {
          bookImage.classList.remove("hidden");
        }
      }
    });
  }

  // Określenie tła dla oceny książki
  determineRatingBgc(rating) {
    if (rating >= 8) {
      return "linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)";
    } else if (rating >= 6) {
      return "linear-gradient(to bottom, #f0e95b 0%, #f0e95b 100%)";
    } else {
      return "linear-gradient(to bottom, #df5b5b 0%, #df5b5b 100%)";
    }
  }

  // Wygenerowanie widoku aplikacji na podstawie danych książek
  render() {
    this.booksList.innerHTML = this.data
      .map((book) => ({
        ...book,
        ratingWidth: book.rating * 10,
        ratingBgc: this.determineRatingBgc(book.rating),
      }))
      .map((book) => this.template(book))
      .join("");
  }
}

// Utworzenie instancji klasy BooksList
const app = new BooksList();
console.log(app);

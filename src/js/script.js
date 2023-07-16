function render() {
  // Przygotowanie referencji do szablonu i listy .books-list
  const template = document.querySelector("#template-book");
  const booksList = document.querySelector(".books-list");

  // Przejście po każdej książce z dataSource.books
  dataSource.books.forEach((book) => {
    // Wygenerowanie kodu HTML na podstawie szablonu i danych o książce
    const html = template.innerHTML
      .replace("{{ title }}", book.name)
      .replace("{{ author }}", book.author)
      .replace("{{ image }}", book.image)
      .replace("{{ price }}", "$" + book.price)
      .replace("{{ rating }}", book.rating);

    // Utworzenie elementu DOM na podstawie wygenerowanego kodu HTML
    const bookElement = document.createElement("li");
    bookElement.className = "book";
    bookElement.innerHTML = html;

    // Dołączenie wygenerowanego elementu DOM jako nowego dziecka do listy .books-list
    booksList.appendChild(bookElement);
  });
}

// Wywołanie funkcji render
render();

// Dodanie nowej pustej tablicy favoriteBooks
const favoriteBooks = [];

function initActions() {
  // Przygotowanie referencji do listy wszystkich elementów .book__image w liście .books-list
  const booksList = document.querySelector(".books-list");

  // Dodanie nasłuchiwacza dla wykrycia kliknięcia na całej liście .books-list
  booksList.addEventListener("click", (event) => {
    event.preventDefault(); // Zatrzymanie domyślnego zachowania przeglądarki

    // Sprawdzenie, czy kliknięcie było na elementze o klasie .book__image
    if (event.target.classList.contains("book__image")) {
      // Pobranie identyfikatora książki z atrybutu data-id
      const bookId = event.target.getAttribute("data-id");

      // Sprawdzenie, czy książka jest już w ulubionych
      const isFavorite = favoriteBooks.includes(bookId);

      if (!isFavorite) {
        // Książka nie jest w ulubionych - dodanie klasy favorite i zapisanie id książki w tablicy favoriteBooks
        event.target.classList.add("favorite");
        favoriteBooks.push(bookId);
      } else {
        // Książka jest już w ulubionych - usunięcie id z tablicy favoriteBooks i usunięcie klasy favorite
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
        event.target.classList.remove("favorite");
      }
    }
  });
}

// Przygotowanie referencji do listy .books-list
const booksList = document.querySelector(".books-list");

// Dodanie nasłuchiwacza dla wykrycia kliknięcia w .books-list
booksList.addEventListener("click", (event) => {
  // Sprawdzenie, czy kliknięty element ma klasę .book__image
  if (event.target.classList.contains("book__image")) {
    event.preventDefault(); // Zatrzymanie domyślnego zachowania przeglądarki

    // Sprawdzenie, czy książka jest już w ulubionych
    const isFavorite = event.target.classList.contains("favorite");

    if (!isFavorite) {
      // Książka nie jest w ulubionych - dodanie klasy favorite
      event.target.classList.add("favorite");
    } else {
      // Książka jest już w ulubionych - usunięcie klasy favorite
      event.target.classList.remove("favorite");
    }
  }
});

// Wywołanie funkcji initActions
initActions();

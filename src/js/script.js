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
// Pusta tablica filters na przechowywanie wybranych filtrów
const filters = [];

function handleFilterClick(event) {
  const clickedElement = event.target;

  // Sprawdzamy, czy kliknięty element jest checkboxem
  if (
    clickedElement.tagName === "INPUT" &&
    clickedElement.type === "checkbox" &&
    clickedElement.name === "filter"
  ) {
    const filterValue = clickedElement.value;

    // Sprawdzamy, czy checkbox jest zaznaczony
    if (clickedElement.checked) {
      // Dodajemy wartość do tablicy filters, jeśli nie ma jej jeszcze w tablicy
      if (!filters.includes(filterValue)) {
        filters.push(filterValue);
      }
    } else {
      // Usuwamy wartość z tablicy filters, jeśli jest już w tablicy
      const index = filters.indexOf(filterValue);
      if (index !== -1) {
        filters.splice(index, 1);
      }
    }

    // Wyświetlamy tablicę filters w konsoli (tylko do celów testowych)
    console.log(filters);
  }
}

function initActions() {
  // Przygotowanie referencji do listy wszystkich elementów .book__image w liście .books-list
  const booksList = document.querySelector(".books-list");
  const form = document.querySelector(".filters");

  // Dodanie nasłuchiwacza dla zmiany stanu checkboxa w formularzu
  form.addEventListener("change", filterBooks);

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

  // Przygotowanie referencji do formularza
  const filtersForm = document.querySelector(".filters");

  // Dodanie nasłuchiwacza dla wykrycia kliknięcia w formularzu
  filtersForm.addEventListener("click", handleFilterClick);
}

// Wywołanie funkcji initActions
initActions();

// Nowa funkcja do filtrowania książek na podstawie wybranych filtrów
function filterBooks() {
  const booksList = document.querySelector(".books-list");

  dataSource.books.forEach((book) => {
    let shouldBeHidden = false; // Domyślnie ustawione na false dla każdej książki

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    const bookImage = booksList.querySelector(
      `.book__image[data-id="${book.id}"]`
    );

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

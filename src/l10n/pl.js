const pl = {
    date: {
        api: "YYYY-MM-DD",
        datepicker: "MMM d yyyy",
        long: "Do MMMM YYYY",
        short: "D MMM YYYY",
        shortAndTime: "D MMM YYYY H:mm"
    },
    actions: {
        logout: "Został(a)eś wylogowan(a)y.",
        wrongLoginData: "Podane dane logowania są nieprawidłowe!"
    },
    addBookForm: {
        authorError: "Autor musi mieć imię i nazwisko!",
        authorNotOnList: "Jeśli nie ma autora na liście, dodaj go",
        authorTitle: "Aby dodać autora do książki, znajdź go na liście poniżej",
        authors: "Autorzy dodani do książki",
        bookEndDate: "Data zakończenia czytania",
        bookError: "Nie wybrałe(a)ś książki!",
        bookFormat: "Format książki",
        bookLanguage: "Język książki",
        bookNewBook: "Dodaj nową książkę:",
        bookNotes: "Twoje notatki dotyczące książki",
        bookNotOnList: "Nie mogę zanleźć książki na liście.",
        bookRating: "Twoja ocena książki: ",
        bookStatus: "Status książki",
        bookStartDate: "Data rozpoczęcia czytania",
        bookTitle: "Aby dodać książkę do swojej listy, znajdź ją na liście poniżej.",
        cancel: "Anuluj",
        endDateError: "Data zakończenia czytania jest wymagana i musi być późniejsza niż data rozpoczęcia czytania.",
        firstName: "Imię autora",
        lastName: "Nazwisko autora",
        noAuthorError: "Książka musi mieć autora!",
        size: "Liczba stron",
        startDateError: "Data rozpoczęcia czytania jest wymagana!",
        submit: "Wyślij",
        subTitle: "Podtytuł",
        successMessage: "Książka dodana.",
        title: "Tytuł",
        titleError: "Książka musi mieć tytuł!"
    },    
    addBookHandler: {
      title: "Dodaj nową książkę"  
    },
    autoselectHandler: {
      authors: "Zacznij pisać aby znaleźć autora...",
      books: "Zacznij pisać aby znaleźć książkę..."  
    },
    booksList:{
        author: "Autor(zy)",
        cancelButton: "Anuluj",
        deleteButton: "Usuń",
        deleteConfirmation: "Proszę potwierdzić cheć usunięcia tej książki. Ta operacja nie może być cofnięta.",
        editButton: "Edycja",
        endDate: "Koniec czytania",
        endDateError: "To pole jest wymagane i musi być późniejsze niż Początek czytania!",
        format: "Format książki: ",
        historyButton: "Historia",
        language: "Język książki: ",
        noBooks: "Nie masz jeszcze książek na swojej liście.",
        notes: "Twoje notatki: ",
        rating: "Twoja ocena: ",
        saveButton: "Zapisz",
        sizeLabel: "Wielkość książki: ",
        size: "%{pages} stron(y)",
        startDate: "Początek czytania",
        startDateError: "To pole jest wymagane!",
        status: "Status książki",
        successDelete: "Książka została usunięta z Twojej listy.",
        title: "Tytuł",
        tooltip: {
            closeRow: "Ukryj szczegóły",
            openRow: "Pokaż szczegóły"
        }
    },
    dashboard: {
        addBook: "Dodaj książkę",
        statusFilterPlaceholder: "Filtruj po statusie",
        welcome: "Lista Moich książek"
    },
    format: {
        audiobook: "Audiobook",
        eBook: "E-book",
        paper: "Papierowa"
    },
    historyList: {
        action: "Akcja",
        changes: "Co zostało zmienione",
        column: {
            endDate: "Koniec czytania: ",
            format: "Format książki: ",
            language: "Język książki: ",
            notes: "Notatki: ",
            rating: "Ocena: ",
            startDate: "Koniec czytania: ",
            status: "Status książki: "
        },
        date: "Data",
        noResults: "Nie ma jeszcze historii."
    },
    language: {
        en: "Angielski",
        pl: "Polski"
    },
    logAction: {
      create : "Utworzono",
      delete: "Skasowano",
      update: "Zaktualizowano"
    },
    loginForm: {
        enterEmail: "Podaj email",
        loginSubmit: "Wyślij",
        password: "Hasło",
        title: "Logowanie"
    },
    notFound: {
        notFound: "Strony nie znaleziono"
    },
    registerForm: {
        enterEmail: "Podaj email",
        registerSubmit: "Wyślij",
        password: "Hasło",
        passwordCapitalLetter: "Hasło zawiera dużą literę",
        passwordDigit: "Hasło zawiera cyfrę",
        passwordLength: "Hasło ma minimum 7 znaków",
        passwordsDifferent: "Hasła nie są identyczne",
        passwordSmallLetter: "Hasło zawiera małą literę",
        repeatPassword: "Powtórz hasło",
        successMessage: "Konto zostało utworzone",
        title: "Rejestracja"
    },
    status: {
        abandoned: "Porzucona",
        during: "W trakcie",
        finished: "Ukończona",
        planned: "Planowana"  
    },
    statusBar: {
        brand: "Czytacz",
        logIn: "Zaloguj się",
        logOut: "Wyloguj się",
        register: "Utwórz konto"
    },
    welcome: {
        welcome: "Strona powitalna przed zalogowaniem"
    }
};

export default pl;

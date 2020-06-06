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
        termsText: "Rejestrując się zgadzasz się na nasze ",
        terms: "warunki",
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
    terms: {
        close: "Zamknij",
        par1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus mauris porta felis feugiat, quis sodales turpis cursus. Donec tempor lectus in neque lacinia tristique. Nullam faucibus egestas sem ut tristique. Aliquam est velit, laoreet ut facilisis quis, auctor in nisi. Aenean augue erat, maximus eget eleifend vel, pellentesque vitae neque. Nulla posuere tristique ligula eget placerat. Nunc massa mauris, dignissim sit amet hendrerit at, commodo porta diam. Sed ut tempor sapien. Donec commodo vitae quam vel pulvinar. Fusce sagittis accumsan molestie. Morbi dignissim ultricies ultricies.",
        par2: "Vivamus pellentesque ante id lorem congue sodales. Duis porttitor iaculis metus, at viverra mauris. Nam imperdiet suscipit ligula ut imperdiet. Nunc convallis mollis mauris, et cursus arcu egestas elementum. Aliquam sodales fringilla odio, ullamcorper iaculis libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur placerat viverra accumsan. Morbi luctus commodo scelerisque. Suspendisse potenti. Etiam luctus, nisi a viverra dapibus, lectus justo aliquet eros, id rhoncus velit felis nec justo. Praesent pretium augue et dapibus volutpat. Nullam urna erat, mattis vel faucibus at, consequat vel lorem. In id diam a odio vehicula consectetur. Fusce tempus nunc sit amet condimentum tincidunt.",
        par3: "Maecenas imperdiet, massa id dignissim condimentum, sem turpis feugiat nunc, eget feugiat est ipsum sit amet magna. Etiam neque diam, luctus a vestibulum vitae, interdum eget ante. Morbi sagittis, sapien sit amet sollicitudin elementum, tortor nisi pellentesque tellus, eget lacinia purus diam lobortis nisl. Nam commodo, justo eget finibus hendrerit, nunc enim volutpat mi, id bibendum sapien diam vel ex. Fusce nunc velit, feugiat imperdiet risus in, efficitur tincidunt sem. Donec elementum ultrices molestie. Maecenas tempor mi nunc, sit amet porta est sodales vel. In non neque dignissim, congue neque sodales, finibus ligula. Fusce in ultrices arcu. Sed posuere pulvinar elit nec vulputate. Praesent quis pulvinar massa. Praesent ac nulla porttitor, commodo sem et, cursus mauris. Aenean accumsan vestibulum sagittis. Vivamus consectetur turpis in commodo consequat.",
        par4: "Aenean ullamcorper eu orci vulputate placerat. Quisque mi nunc, bibendum elementum consequat vel, sagittis id tellus. Fusce feugiat sem id est tincidunt hendrerit. Maecenas luctus et ligula vitae commodo. Aenean quis lectus in nunc posuere bibendum. Proin nisl ipsum, ornare at erat at, efficitur feugiat sapien. Cras imperdiet accumsan libero sit amet scelerisque. Donec augue dui, hendrerit venenatis suscipit quis, dictum iaculis eros. Integer tincidunt porta mi et ornare. Vestibulum porta scelerisque diam, a mollis orci vulputate sagittis. Vivamus condimentum dolor id risus sagittis lobortis.",
        par5: "Suspendisse at lobortis est, at sodales purus. Mauris at tincidunt ligula. Phasellus non justo molestie, maximus lacus at, interdum urna. Morbi in consectetur magna. Praesent ac interdum urna, nec feugiat nulla. Aenean eget risus hendrerit, posuere nibh et, mattis dolor. Proin porta vestibulum neque vitae ultricies. In eget enim molestie, mollis libero at, tincidunt sem. Vivamus nec nibh pharetra, consectetur est in, faucibus tellus. Aenean ornare non quam ac viverra. Sed hendrerit est quis efficitur cursus. Vivamus cursus sagittis tortor, vitae scelerisque eros vestibulum ut. Morbi imperdiet ligula vitae magna dapibus, ut fringilla ligula gravida. Fusce leo sapien, efficitur sit amet enim molestie, sagittis suscipit lacus.",
        title: "Warunki użytkowania"
    },
    welcome: {
        welcome: "Strona powitalna przed zalogowaniem"
    }
};

export default pl;

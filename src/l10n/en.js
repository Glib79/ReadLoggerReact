const en = {
    date: {
        api: "YYYY-MM-DD",
        datepicker: "MMM d yyyy",
        long: "MMMM Do, YYYY",
        short: "MMM D YYYY",
        shortAndTime: "MMM D YYYY h:mm a"
    },
    actions: {
        logout: "You were logged out.",
        wrongLoginData: "Provided login data are wrong!"
    },
    addBookForm: {
        authorError: "Author must have first and last name!",
        authorNotOnList: "If author is not on the list, add them",
        authorTitle: "To add author to your book find author on the list below",
        authors: "Authors added to the book",
        bookEndDate: "End reading date",
        bookError: "You didn't chose the book!",
        bookFormat: "Book format",
        bookLanguage: "Book language",
        bookNewBook: "Add new book:",
        bookNotes: "Your notes about this book",
        bookNotOnList: "I can't find book on list.",
        bookRating: "Your rating for this book: ",
        bookStatus: "Book status",
        bookStartDate: "Start reading date",
        bookTitle: "To add book to your list find book on the list below.",
        cancel: "Cancel",
        endDateError: "Reading end date is required and it must be later then Reading start date.",
        firstName: "Authors first name",
        lastName: "Authors last name",
        noAuthorError: "Book must have minimum one author!",
        size: "Number of pages",
        startDateError: "Reading start date is required!",
        submit: "Submit",
        subTitle: "Subtitle",
        successMessage: "Book added.",
        title: "Title",
        titleError: "Book must have title!"
    },
    addBookHandler: {
        title: "Add new book"  
    },
    autoselectHandler: {
        authors: "Start typing to find author...",
        books: "Start typing to find a book..."  
    },
    booksList: {
        author: "Author(s)",
        cancelButton: "Cancel",
        deleteButton: "Delete", 
        deleteConfirmation: "Please confirm that you would like to delete this book. This operation can not be reversed.",
        editButton: "Edit",
        endDate: "Reading end date",
        endDateError: "This field is required and must be later then Reading start date!",
        format: "Book format: ",
        historyButton: "History",
        language: "Book language: ",
        noBooks: "You have no books on your list yet.",
        notes: "Your notes: ",
        rating: "Your rating: ",
        saveButton: "Save",
        sizeLabel: "Book size: ",
        size: "%{pages} pages",
        startDate: "Reading start date",
        startDateError: "This field is required!",
        status: "Book status",
        successDelete: "Book was successfully removed from your list.",
        title: "Title",
        tooltip: {
            closeRow: "Hide details",
            openRow: "Show details"
        }
    },
    dashboard: {
        addBook: "Add Book",
        statusFilterPlaceholder: "Filter by status",
        welcome: "My books list"
    },
    format: {
        audiobook: "Audiobook",
        eBook: "E-book",
        paper: "Paper"
    },
    historyList: {
        action: "Action",
        changes: "What changed",
        column: {
            endDate: "Reading end date: ",
            format: "Book format: ",
            language: "Book language: ",
            notes: "Notes: ",
            rating: "Rating: ",
            startDate: "Reading start date: ",
            status: "Book status: "
        },
        date: "Date",
        noResults: "There is no history yet."
    },
    language: {
        en: "English",
        pl: "Polish"
    },
    logAction: {
      create : "Created",
      delete: "Deleted",
      update: "Updated"
    },
    loginForm: {
        enterEmail: "Enter email",
        loginSubmit: "Submit",
        password: "Password",
        title: "Log In"
    },
    notFound: {
        notFound: "Route not found"
    },
    registerForm: {
        enterEmail: "Enter email",
        registerSubmit: "Submit",
        password: "Password",
        passwordCapitalLetter: "Password contain capital letter",
        passwordDigit: "Password contain digit",
        passwordLength: "Password has minimum 7 signs",
        passwordsDifferent: "Passwords are not identical",
        passwordSmallLetter: "Password contain small letter",
        repeatPassword: "Repeat password",
        successMessage: "Account created",
        title: "Registration"
    },
    status: {
        abandoned: "Abandoned",
        during: "During",
        finished: "Finished",
        planned: "Planned"  
    },
    statusBar: {
        brand: "Read Logger",
        logIn: "Sign In",
        logOut: "Sign Out",
        register: "Sign Up"
    },
    welcome: {
        welcome: "Start page before log in"
    }
};

export default en;

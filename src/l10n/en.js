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
    confirm: {
        emailText: "You are confirming e-mail address: ",
        error: "failed",
        status: "Confirmation status: ",
        success: "success",
        title: "Thank you for confirming your e-mail!"
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
        successMessage: "Account created! We will send you e-mail soon, please click link inside to confirm your e-mail address.",
        termsText: "By registering you are agreeing to our ",
        terms: "terms",
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
    terms: {
        close: "Close",
        par1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus mauris porta felis feugiat, quis sodales turpis cursus. Donec tempor lectus in neque lacinia tristique. Nullam faucibus egestas sem ut tristique. Aliquam est velit, laoreet ut facilisis quis, auctor in nisi. Aenean augue erat, maximus eget eleifend vel, pellentesque vitae neque. Nulla posuere tristique ligula eget placerat. Nunc massa mauris, dignissim sit amet hendrerit at, commodo porta diam. Sed ut tempor sapien. Donec commodo vitae quam vel pulvinar. Fusce sagittis accumsan molestie. Morbi dignissim ultricies ultricies.",
        par2: "Vivamus pellentesque ante id lorem congue sodales. Duis porttitor iaculis metus, at viverra mauris. Nam imperdiet suscipit ligula ut imperdiet. Nunc convallis mollis mauris, et cursus arcu egestas elementum. Aliquam sodales fringilla odio, ullamcorper iaculis libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur placerat viverra accumsan. Morbi luctus commodo scelerisque. Suspendisse potenti. Etiam luctus, nisi a viverra dapibus, lectus justo aliquet eros, id rhoncus velit felis nec justo. Praesent pretium augue et dapibus volutpat. Nullam urna erat, mattis vel faucibus at, consequat vel lorem. In id diam a odio vehicula consectetur. Fusce tempus nunc sit amet condimentum tincidunt.",
        par3: "Maecenas imperdiet, massa id dignissim condimentum, sem turpis feugiat nunc, eget feugiat est ipsum sit amet magna. Etiam neque diam, luctus a vestibulum vitae, interdum eget ante. Morbi sagittis, sapien sit amet sollicitudin elementum, tortor nisi pellentesque tellus, eget lacinia purus diam lobortis nisl. Nam commodo, justo eget finibus hendrerit, nunc enim volutpat mi, id bibendum sapien diam vel ex. Fusce nunc velit, feugiat imperdiet risus in, efficitur tincidunt sem. Donec elementum ultrices molestie. Maecenas tempor mi nunc, sit amet porta est sodales vel. In non neque dignissim, congue neque sodales, finibus ligula. Fusce in ultrices arcu. Sed posuere pulvinar elit nec vulputate. Praesent quis pulvinar massa. Praesent ac nulla porttitor, commodo sem et, cursus mauris. Aenean accumsan vestibulum sagittis. Vivamus consectetur turpis in commodo consequat.",
        par4: "Aenean ullamcorper eu orci vulputate placerat. Quisque mi nunc, bibendum elementum consequat vel, sagittis id tellus. Fusce feugiat sem id est tincidunt hendrerit. Maecenas luctus et ligula vitae commodo. Aenean quis lectus in nunc posuere bibendum. Proin nisl ipsum, ornare at erat at, efficitur feugiat sapien. Cras imperdiet accumsan libero sit amet scelerisque. Donec augue dui, hendrerit venenatis suscipit quis, dictum iaculis eros. Integer tincidunt porta mi et ornare. Vestibulum porta scelerisque diam, a mollis orci vulputate sagittis. Vivamus condimentum dolor id risus sagittis lobortis.",
        par5: "Suspendisse at lobortis est, at sodales purus. Mauris at tincidunt ligula. Phasellus non justo molestie, maximus lacus at, interdum urna. Morbi in consectetur magna. Praesent ac interdum urna, nec feugiat nulla. Aenean eget risus hendrerit, posuere nibh et, mattis dolor. Proin porta vestibulum neque vitae ultricies. In eget enim molestie, mollis libero at, tincidunt sem. Vivamus nec nibh pharetra, consectetur est in, faucibus tellus. Aenean ornare non quam ac viverra. Sed hendrerit est quis efficitur cursus. Vivamus cursus sagittis tortor, vitae scelerisque eros vestibulum ut. Morbi imperdiet ligula vitae magna dapibus, ut fringilla ligula gravida. Fusce leo sapien, efficitur sit amet enim molestie, sagittis suscipit lacus.",
        title: "Terms of use"
    },
    welcome: {
        welcome: "Start page before log in"
    }
};

export default en;

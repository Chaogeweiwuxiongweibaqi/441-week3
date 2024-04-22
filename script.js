const name = 'Tony';  
const id = '223190729';  
  
 
const macAddress = '您的Mac地址';  
const ipAddress = '您的IP地址';  
  
const sqlite3 = require('sqlite3').verbose();  
let db = new sqlite3.Database('./book.db', (err) => {  
  if (err) {  
    return console.error(err.message);  
  }  
  console.log('Connected to the SQLite database.');  
  initDatabase();  
});  
  
function initDatabase() {  
  db.serialize(() => {  
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title729 TEXT, author729 TEXT, ISBN729 TEXT, context729 TEXT)');  
    insertSampleBooks();  
    promptForMoreBooks();  
  });  
}  
  
function insertSampleBooks() {  
  const studentIdSuffix = id.slice(-3); // 
  const books = [  
    {title: 'Example Book Name 001', author: 'Example Author 001', ISBN: 'Example ISBN001', context: 'Example Content 001'},
    {title: 'Example Book Name 002', author: 'Example Author 002', ISBN: 'Example ISBN002', context: 'Example Content 002'},
    {title: 'Example Book Name 003', author: 'Example Author 003', ISBN: 'Example ISBN003', context: 'Example Content 003'}
 
  ];  
  
  books.forEach(book => {  
    insertBook(`${book.title}${studentIdSuffix}`, `${book.author}${studentIdSuffix}`, `${book.ISBN}${studentIdSuffix}`, book.context);  
  });  
}  
  
function insertBook(title729, author729, ISBN729, context729) {  
  db.run('INSERT INTO books (title729, author729, ISBN729, context729) VALUES (?, ?, ?, ?)', [title729, author729, ISBN729, context729], function(err) {  
    if (err) {  
      return console.error(err.message);  
    }  
    console.log(`A row has been inserted with rowid ${this.lastID}`);  
  });  
}  
  
function promptForMoreBooks() {  
  const readline = require('readline').createInterface({  
    input: process.stdin,  
    output: process.stdout  
  });  
  
  readline.question('Do you want to continue inputting book information?  (yes/no): ', (answer) => {  
    readline.close();  
    if (answer.toLowerCase() === 'yes') {  
      readAndInsertBook();  
    } else {  
      listBooks();  
    }  
  });  
}  
  
function readAndInsertBook() {  
  const readline = require('readline').createInterface({  
    input: process.stdin,  
    output: process.stdout  
  });  
  
  readline.question('Please enter the book name:', (title) => {  
    const studentIdSuffix = id.slice(-3);  
    readline.question('Please enter the author:', (author) => {  
      readline.question('Please enter ISBN: ', (ISBN) => {  
        readline.question('Please enter the content of the book:', (context) => {  
          insertBook(`${title}${studentIdSuffix}`, `${author}${studentIdSuffix}`, `${ISBN}${studentIdSuffix}`, context);  
          promptForMoreBooks(); // 
        });  
      });  
    });  
  });  
}  
  

  
function listBooks() {  
  db.all('SELECT * FROM books', [], (err, rows) => {  
    if (err) {  
      return console.error(err.message);  
    }  
    console.log('All book records:');  
    rows.forEach((row) => {  
      console.log(`ID: ${row.id}, Title729: ${row.title729}, Author729: ${row.author729}, ISBN729: ${row.ISBN729}, Context729: ${row.context729}`);  
    });  
    db.close((err) => {  
      if (err) {  
        return console.error(err.message);  
      }  
      console.log('Close the database connection.');  
    });  
  });  
}




//1 Introducing the sqlite3 library and creating database connections
//2 Initialize database tables
//3 Insert sample book data
//4 Prompt the user whether to continue inputting more book information
//5 List all book records

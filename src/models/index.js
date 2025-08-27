import { Sequelize } from "sequelize";
import authorModel from "./author.model.js";
import bookModel from "./book.model.js";
import sagaModel from "./saga.model.js";
import genreModel from "./genre.model.js";
import languageModel from "./language.model.js";
import authorLangModel from "./authorLang.model.js";

// Récuperation des variables d'env
const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

// Initialisation de l'objet "sequelize"
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'postgres'
});

// Objet DB -> Élement qui regroupe tous ce qui est lié à la base de donnée
const db = {};
export default db;

// - L'instance "sequelize"
db.sequelize = sequelize;

// - Les models
db.Author = authorModel(sequelize);
db.Book = bookModel(sequelize);
db.Saga = sagaModel(sequelize);
db.Genre = genreModel(sequelize);
db.Language = languageModel(sequelize);
db.AuthorLang = authorLangModel(sequelize);

// - Les relations entre les models
//? Author/Book (One to  Many)
db.Author.hasMany(db.Book);
db.Book.belongsTo(db.Author);

//? Saga/Book (One to  Many)
db.Saga.hasMany(db.Book);
db.Book.belongsTo(db.Saga);

// ? Genre/Book (Many to  Many)
db.Genre.belongsToMany(db.Book, { through: 'book_genre' });
db.Book.belongsToMany(db.Genre, { through: 'book_genre' });

//? Genre/Saga (Many to  Many)
db.Genre.belongsToMany(db.Saga, { through: 'saga_genre' });
db.Saga.belongsToMany(db.Genre, { through: 'saga_genre' });

//? Language/Author (Many to  Many)
db.Language.belongsToMany(db.Author, { through: db.AuthorLang });
db.Author.belongsToMany(db.Language, { through: db.AuthorLang });
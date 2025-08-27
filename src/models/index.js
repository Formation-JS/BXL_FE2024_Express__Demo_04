import { Sequelize } from "sequelize";
import authorModel from "./author.model.js";

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
db.Book = null; //TODO Finish this !

// - Les relations entre les models
//? (One to  Many)
// db.Author.hasMany(db.Book);
// db.Book.belongsTo(db.Author);

//? (Many to  Many)
// db.Author.belongsToMany(db.Book, { through: 'author_book' });
// db.Book.belongsToMany(db.Author, { through: 'author_book' });
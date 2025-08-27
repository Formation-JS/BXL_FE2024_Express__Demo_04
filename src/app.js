import db from './models/index.js';

try {

    //! Connection vers la base de donnée PostgreSQL
    await db.sequelize.authenticate();

    //! Générer la base de donnée via sequelize (Code first)
    //? - Syncrhonisation de la DB [Simple]
    // await db.sequelize.sync();

    //? - Syncrhonisation avec des modifications de DB
    //? Ajout et Retrait 
    // await db.sequelize.sync({
    //     alter: true,             
    // });

    //? Ajout
    // await db.sequelize.sync({
    //     alter: { drop: false } 
    // });

    //? - Ré-création complete de la DB (Perde de donnée !!!)
    // await db.sequelize.sync({
    //     force: true
    // });

    //! Manipulation dans la DB via Sequelize
    // await demoInsert();
    await afficherGenres();

}
catch (error) {
    console.log(error);
}

/**
 * Démo d'un insert en DB
 */
async function demoInsert() {
    // Création d'un élément
    const author = {
        firstName: 'Della',
        lastName: 'Duck',
        birthDate: new Date(1988, 13, 9)
    };

    const authorInDB = await db.Author.create(author);
    console.log('Auteur créé', authorInDB);

    // Création de plusieur éléments
    const genresInDB = await db.Genre.bulkCreate([
        { name: 'Aventure' },
        { name: 'Action' },
        { name: 'SF' }
    ]);
    console.log('Genres créé', genresInDB);
}

/**
 * Démo d'un select en DB
 */
async function afficherGenres() {

    const genres = await db.Genre.findAll()

    console.log('Liste des genres : ');
    for(const genre of genres) {
        console.log(` - ${genre.name}`);
    }
    console.log();
}
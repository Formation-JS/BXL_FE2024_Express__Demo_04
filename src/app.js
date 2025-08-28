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
    await demoGetAll();

}
catch (error) {
    console.log(error);
}

/**
 * Démo d'un insert en DB
 * https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
 */
async function demoInsert() {
    // Création d'un élément (Méthode "create")
    const authorDella = {
        firstName: 'Della',
        lastName: 'Duck',
        birthDate: new Date(1988, 13, 9)
    };

    const dellaInDB = await db.Author.create(authorDella);
    console.log('Della créé', dellaInDB);


    // Création d'un élément (Méthode "build & save")
    const authorGontran = db.Author.build({
        firstName: 'Gontran',
        lastName: 'Bonheur',
        birthDate: new Date(1989, 9, 6)
    });

    const gontranInDB = await authorGontran.save();
    console.log('Gontran créé', gontranInDB);


    // Création de plusieur éléments
    const genresInDB = await db.Genre.bulkCreate([
        { name: 'Drame Philosophique' },
        { name: 'Fantasy' },
        { name: 'Biographie Inspirante' },
        { name: 'Comédie' },
        { name: 'Action Aventure' },
        { name: 'Science-Fiction Dystopique' },
        { name: 'Romance Historique' },
        { name: 'Poésie' },
        { name: 'Thriller Psychologique' },
        { name: 'Policier Historique' },
        { name: 'Historique' },
        { name: 'Fantasy Romantique' },
        { name: 'Mystère' },
        { name: 'Aventure Science-Fiction' },
        { name: 'Classique' },
        { name: 'Comédie Dramatique' },
        { name: 'Science-Fiction' },
        { name: 'Aventure Jeunesse' },
        { name: 'Philosophie' },
        { name: 'Aventure' },
        { name: 'Jeunesse' },
        { name: 'Romance' },
        { name: 'Policier' },
        { name: 'Horreur Fantastique' },
        { name: 'Action' },
        { name: 'Thriller' },
        { name: 'Fantastique' },
        { name: 'Horreur' },
        { name: 'Aventure Fantastique' },
        { name: 'Dystopie' }
    ]);
    console.log('Genres créé', genresInDB);
}

/**
 * Démo d'un select en DB
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries
 */
async function demoGetAll() {

    const genres = await db.Genre.findAll();

    console.log('Liste des genres : ');
    for (const genre of genres) {
        console.log(` - ${genre.name}`);
    }
    console.log();
}

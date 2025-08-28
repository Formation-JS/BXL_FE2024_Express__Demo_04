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
    await db.sequelize.sync({
        force: true
    });

    //! Manipulation dans la DB via Sequelize
    await demoInsert();
    await insertWithRelation1();
    await insertWithRelation2();
    await insertWithRelation3();
    // await demoGetAll();

}
catch (error) {
    console.log(error);
}

/**
 * ! Démo d'un insert en DB
 * https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
 */
async function demoInsert() {
    // Création d'un élément (Méthode "create")
    const authorDella = {
        firstName: 'Della',
        lastName: 'Duck',
        birthDate: new Date(1988, 3, 9)
    };

    const dellaInDB = await db.Author.create(authorDella);
    // console.log('Della créé', dellaInDB);


    // Création d'un élément (Méthode "build & save")
    const authorGontran = db.Author.build({
        firstName: 'Gontran',
        lastName: 'Bonheur',
        birthDate: new Date(1989, 9, 6)
    });

    const gontranInDB = await authorGontran.save();
    // console.log('Gontran créé', gontranInDB);


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
    // console.log('Genres créé', genresInDB);
}

/**
 * ! Démo d'un select en DB
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


/** 
 * ! Démo d'un update en DB (v1)
 * https://sequelize.org/docs/v6/core-concepts/model-instances/#updating-an-instance
*/
async function demoUpdate1() {
    // Récuperation de l'objet auteur "Gontran Bonheur"
    const gontran = await db.Author.findOne({
        where: {
            firstName: 'Gontran',
            lastName: 'Bonheur'
        }
    });

    // Modification de sa date de naissance
    const day = Math.round(Math.random() * 30) + 1;
    gontran.birthDate = new Date(1989, 9, day);

    // Sauvegarde de la modification
    await gontran.save();
}

/** 
 * ! Démo d'un update en DB (v2)
 * https://sequelize.org/docs/v6/core-concepts/model-instances/#updating-an-instance
*/
async function demoUpdate2() {
    // Récuperation de l'objet auteur "Gontran Bonheur"
    const gontran = await db.Author.findOne({
        where: {
            firstName: 'Gontran',
            lastName: 'Bonheur'
        }
    });

    // Modification de sa date de naissance
    const day = Math.round(Math.random() * 30) + 1;
    gontran.update({
        birthDate: new Date(1989, 9, day)
    });

    // Sauvegarde de la modification
    await gontran.save();
}


/**
 * ! Démo d'un insert d'une relation entre des tables (v1)
 * https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
 */
async function insertWithRelation1() {

    // Récuperation ou création des langues : "Francais de france" et "Anglais des USA"
    const [langueFr, isFrCreated] = await db.Language.findOrCreate({
        where: {
            name: 'Français',
            locale: 'fr-fr'
        }
    });
    const [langueEn] = await db.Language.findOrCreate({
        where: {
            name: 'Anglais',
            locale: 'en-us'
        }
    });

    // Ajout des langues à Della (francais maternel et anglais) 
    const della = await db.Author.findOne({
        where: { firstName: 'Della', lastName: 'Duck' }
    });

    // Méthode fourni par la configuration de la relation -> "belongsToMany"
    await della.addLanguage(langueEn);
    await della.addLanguage(langueFr, { through: { isMother: true } });
}

/**
 * ! Démo d'un insert d'une relation entre des tables (v2 -> A la mano)
 * https://sequelize.org/docs/v6/core-concepts/assocs/
 */
async function insertWithRelation2() {

    // Récuperation ou création de la langue : "Francais de Canada"
    const [langueFr] = await db.Language.findOrCreate({
        where: {
            name: 'Français',
            locale: 'fr-ca'
        }
    });

    // Ajout des langues à Della (francais maternel et anglais) 
    const gontran = await db.Author.findOne({
        where: { firstName: 'Gontran', lastName: 'Bonheur' }
    });

    // Création dans la table intermediaire
    await db.AuthorLang.create({
        AuthorId: gontran.id,
        LanguageId: langueFr.id,
        isMother: true
    });
}

/**
 * ! Démo d'un insert d'un auteur avec son relation avec une autre table
 * https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
 */
async function insertWithRelation3() {

    // Ajout d'un auteur avec sa langue (La langue ne doit pas être présente dans la DB)
    const balthy = await db.Author.create({
        firstName: 'Balthazar',
        lastName: 'Picsou',
        birthDate: new Date(1964, 0, 8),
        Languages: [
            {
                name: 'Français',
                locale: 'fr-be',
                AuthorLang: {
                    isMother: true
                }
            }
        ]
    }, {
        include: db.Language
    });

    // Ajout d'une seconde langue
    const langueEn = await db.Language.findOne({
        where: {
            name: 'Anglais',
            locale: 'en-us'
        }
    });
    await balthy.addLanguage(langueEn)
}
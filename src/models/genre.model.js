import { DataTypes, Sequelize } from "sequelize";

/**
 * Fonction pour générer le model "Genre" pour Sequelize
 * @param {Sequelize} sequelize 
 */
export default function genreModel(sequelize) {

    const Genre = sequelize.define('Genre', {
        name: DataTypes.STRING(50)
    }, {
        tableName: 'genre',
        timestamps: false
    });

    return Genre;
}
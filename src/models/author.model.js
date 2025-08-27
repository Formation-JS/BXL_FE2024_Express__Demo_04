import { DataTypes, Sequelize } from "sequelize";

/**
 * Fonction pour générer le model "Author" pour Sequelize
 * @param {Sequelize} sequelize 
 */
export default function authorModel(sequelize) {

    // Le model "Author"
    const Author = sequelize.define('Author', {
        //! Définition des attributs du model
        // Colonne "id" (Si l'id est absent, il sera ajouter par sequelize automatiquement)
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            autoIncrementIdentity: true,
            primaryKey: true
        },
        // Colonne "firstName"
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        // Colonne "lastName"
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        // Colonne "birthDate"
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        //! Les options du model
        tableName: 'author',
        timestamps: true
    });

    return Author;
};
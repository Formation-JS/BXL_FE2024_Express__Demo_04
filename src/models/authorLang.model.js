import { DataTypes, Sequelize } from "sequelize";

/**
 * Fonction pour générer le model "AuthorLang" pour Sequelize
 * @param {Sequelize} sequelize 
 */
export default function authorLangModel(sequelize) {

    const AuthorLang = sequelize.define('AuthorLang', {
        isMother: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'author_language',
        timestamps: false
    }) 
 
    return AuthorLang;
}
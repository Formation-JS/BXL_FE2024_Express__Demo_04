import { DataTypes, Sequelize } from "sequelize";

/**
 * Fonction pour générer le model "Language" pour Sequelize
 * @param {Sequelize} sequelize 
 */
export default function languageModel(sequelize) {

    const Language = sequelize.define('language', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        locale: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        tableName: 'language',
        timestamps: true,
        indexes: [
            {
                name: 'idx_language__name_locale',
                unique : true,
                fields: ['name', 'locale']
            }
        ]
    });

    return Language;
}
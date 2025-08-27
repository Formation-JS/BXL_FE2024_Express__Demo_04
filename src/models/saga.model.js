import { DataTypes, Sequelize } from "sequelize";

/**
 * Fonction pour générer le model "Saga" pour Sequelize
 * @param {Sequelize} sequelize 
 */
export default function sagaModel(sequelize) {

    const Saga = sequelize.define('Saga', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(3_000),
            allowNull: true
        }
    }, {
        tableName: 'saga',
        // timestamps
        createdAt: true,
        updatedAt: false
    });
    
    return Saga;
}
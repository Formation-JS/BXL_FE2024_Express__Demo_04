import { DataTypes, Sequelize } from "sequelize";

/**
 * Fonction pour générer le model "Book" pour Sequelize
 * @param {Sequelize} sequelize 
 */
export default function bookModel(sequelize) {

    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            autoIncrementIdentity: true,
            primaryKey: true
        },
        isbn: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: 'uk_book__isbn'
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(3_000),
            allowNull: true
        },
        yearRelease: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recommendedAge: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'Tous public'
        }
    }, {
        tableName: 'book',
        timestamps: true
    });

    return Book;
}
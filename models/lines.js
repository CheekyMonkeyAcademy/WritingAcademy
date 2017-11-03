module.exports = function(sequelize, DataTypes) {
    let Line = sequelize.define("Line", {
        lineText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lineOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },        
        lineSelected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            len: [1]
        },

        // createdAt: Sequelize.DATE,
        // updatedAt: Sequelize.DATE,
    });

    Line.associate = function(models) {
        // We're saying that a Line belongs to a Story
        // A Line cannot be created without a Story because of fk contstraint
        Line.belongsTo(models.Story, {            
            foreignKey: {
                allowNull: false
            }
        });
        

        //TODO::ROBERTTT!!!!!!
        // Line.belongsTo(models.User, {
        //     foreignKey: {
        //         allowNull:false
        //     }
        // });
    };
    return Line;
};
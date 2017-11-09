module.exports = function(sequelize, DataTypes) {
    let Story = sequelize.define("Story", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        genre: { // TODO adjust this to a Many to many for Genre
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        publiclyVisible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        openVotingToAllUsers: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        openWritingToAllUsers: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        numberOfTimesViewed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            len: [1]
        },
        numberOfTimesUpvoted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            len: [1]
        },
        minimumNumberOfVoters: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            len: [1]
        },  
        minimumNumberOfWriters: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            len: [1]
        },
        toggleWritingTrueOrVotingFalse: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        currentLineGroup: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1           
        },
        scheduleActive: { // Is this just schedule being active?
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        writingTimePeriodInMins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // not sure on this default
        },
        votingTimePeriodInMins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // not sure on this default
        },
        storyProgressionError: {
            type: DataTypes.STRING,
            allowNull: true
        }
        // createdAt: Sequelize.DATE,
        // updatedAt: Sequelize.DATE,
    });

    Story.associate = function(models) {
        Story.hasMany(models.Line, {
            onDelete: "cascade"
        })
    }




    // Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});)

    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    // Post.belongsTo(models.User, {
    //     foreignKey: {
    //         allowNull: false
    //     }
    // });


    return Story;
};
use writing_db;
-- use mnvrsaf2rl6441ma;

INSERT INTO `Stories` (`title`, `genre`, `storyProgressionStatus`, `createdAt`, `UpdatedAt`) VALUES ('The Test Story', 'adventure', 'Testing Ready - on voting currently', '2014-01-04', '2015-02-15'); 
INSERT INTO `Stories` (`title`, `genre`, `storyProgressionStatus`, `createdAt`, `UpdatedAt`) VALUES ('Wweeeee win', 'adventure', 'Initial Setup Complete', '2014-01-04', '2015-02-15');

SELECT * FROM `Stories`;

INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Oleg wrote this line, it won', '1', '1', '2017-1-1', '2017-1-1', '1', '1', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Kyle wrote this line, it lost', '1', '0', '2017-1-1', '2017-1-1', '1', '1', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Someone else wrote this, it lost', '1', '0', '2017-1-1', '2017-1-1', '1', '1', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Kyle wrote this line, it won', '2', '1', '2017-1-1', '2017-1-1', '1', '1', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Mr Green used the candlestick?  Wrong.', '2', '0', '2017-1-1', '2017-1-1', '1', '1', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Once there was a boy who... this line lost', '2', '0', '2017-1-1', '2017-1-1', '1', '1', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Kyle: line to vote on', '3', '0', '2017-1-1', '2017-1-1', '1', '0', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Mr Green: line to vote on.', '3', '0', '2017-1-1', '2017-1-1', '1', '0', '0');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`) VALUES ('Once there was a boy who... line to vote on', '3', '0', '2017-1-1', '2017-1-1', '1', '0', '0');

SELECT * FROM `Lines`;

INSERT INTO `Users` (`tempUserName`, `createdAt`, `updatedAt`) VALUES ('Story1Creator', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`tempUserName`, `createdAt`, `updatedAt`) VALUES ('Story2Creator', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`tempUserName`, `createdAt`, `updatedAt`) VALUES ('Story1Reader', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`tempUserName`, `createdAt`, `updatedAt`) VALUES ('Story1Voter', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`tempUserName`, `createdAt`, `updatedAt`) VALUES ('SomeOtherDude', '2017-1-1', '2017-1-1');

SELECT * FROM `Users`;

SELECT * FROM `Permissions`;

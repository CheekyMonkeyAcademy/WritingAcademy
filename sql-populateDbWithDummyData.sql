use writing_db;
-- use mnvrsaf2rl6441ma;

INSERT INTO `Stories` (`title`, `genre`, `storyProgressionStatus`, `createdAt`, `UpdatedAt`) VALUES ('The Test Story', 'adventure', 'Testing Ready - on voting currently', '2014-01-04', '2015-02-15'); 
INSERT INTO `Stories` (`title`, `genre`, `storyProgressionStatus`, `createdAt`, `UpdatedAt`) VALUES ('Wweeeee win', 'adventure', 'Initial Setup Complete', '2014-01-04', '2015-02-15');

SELECT * FROM `Stories`;

INSERT INTO `Users` (`provider`, `userId`, `displayName`, `createdAt`, `updatedAt`) VALUES ('TwitterFake', '007', 'Story1Creator', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`provider`, `userId`, `displayName`, `createdAt`, `updatedAt`) VALUES ('GoogleMaybe', '006', 'Story2Creator', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`provider`, `userId`, `displayName`, `createdAt`, `updatedAt`) VALUES ('RedditFake', '005', 'Story1Reader', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`provider`, `userId`, `displayName`, `createdAt`, `updatedAt`) VALUES ('TwitterFake', '008', 'Story1Voter', '2017-1-1', '2017-1-1');
INSERT INTO `Users` (`provider`, `userId`, `displayName`, `createdAt`, `updatedAt`) VALUES ('FacebooksFake', '009', 'SomeOtherDude', '2017-1-1', '2017-1-1');

SELECT * FROM `Users`;

INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Oleg wrote this line, it won', '1', '1', '2017-1-1', '2017-1-1', '1', '1', '0', '1');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Kyle wrote this line, it lost', '1', '0', '2017-1-1', '2017-1-1', '1', '1', '0', '2');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Someone else wrote this, it lost', '1', '0', '2017-1-1', '2017-1-1', '1', '1', '0', '3');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Kyle wrote this line, it won', '2', '1', '2017-1-1', '2017-1-1', '1', '1', '0', '1');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Mr Green used the candlestick?  Wrong.', '2', '0', '2017-1-1', '2017-1-1', '1', '1', '0', '2');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Once there was a boy who... this line lost', '2', '0', '2017-1-1', '2017-1-1', '1', '1', '0', '3');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Kyle: line to vote on', '3', '0', '2017-1-1', '2017-1-1', '1', '0', '0', '1');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Mr Green: line to vote on.', '3', '0', '2017-1-1', '2017-1-1', '1', '0', '0', '2');
INSERT INTO `Lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`, `lineVotedOn`, `lineVoteCount`, `userId`) VALUES ('Once there was a boy who... line to vote on', '3', '0', '2017-1-1', '2017-1-1', '1', '0', '0', '3');

SELECT * FROM `Lines`;

INSERT INTO `writing_db`.`Permissions` (`permissionAdmin`, `permissionWrite`, `permissionVote`, `createdAt`, `updatedAt`, `StoryId`, `UserId`) VALUES ('0', '1', '0', '2017-01-1', '2017-1-1', '1', '1');
INSERT INTO `writing_db`.`Permissions` (`permissionAdmin`, `permissionWrite`, `permissionVote`, `createdAt`, `updatedAt`, `StoryId`, `UserId`) VALUES ('0', '1', '0', '2017-01-1', '2017-1-1', '1', '4');
INSERT INTO `writing_db`.`Permissions` (`permissionAdmin`, `permissionWrite`, `permissionVote`, `createdAt`, `updatedAt`, `StoryId`, `UserId`) VALUES ('0', '0', '1', '2017-1-1', '2017-1-1', '1', '3');
INSERT INTO `writing_db`.`Permissions` (`permissionAdmin`, `permissionWrite`, `permissionVote`, `createdAt`, `updatedAt`, `StoryId`, `UserId`) VALUES ('1', '0', '0', '2017-1-1', '2017-1-1', '1', '2');


SELECT * FROM `Permissions`;

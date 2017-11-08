-- use writing_db;
-- use mnvrsaf2rl6441ma;

INSERT INTO `Stories` (`title`, `genre`, `createdAt`, `UpdatedAt`) VALUES ('The Test Story', 'adventure', '2014-01-04', '2015-02-15'); 
INSERT INTO `Stories` (`title`,  `genre`,`createdAt`, `UpdatedAt`) VALUES ('Wweeeee win', 'adventure','2014-01-04', '2015-02-15');

select * from Stories;

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
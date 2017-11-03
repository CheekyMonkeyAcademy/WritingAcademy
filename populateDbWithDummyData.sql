use writing_db;

INSERT INTO `writing_db`.`stories` (`title`, `createdAt`, `UpdatedAt`) VALUES ('Mwahahah', '2014-01-04', '2015-02-15');
INSERT INTO `writing_db`.`stories` (`title`, `createdAt`, `UpdatedAt`) VALUES ('Wweeeee win', '2014-01-04', '2015-02-15');

select * from stories;

INSERT INTO `writing_db`.`lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`) VALUES ('Oleg is the man', '1', '1', '2017-1-1', '2017-1-1', '1');
INSERT INTO `writing_db`.`lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`) VALUES ('Oleg is NOT the man', '1', '0', '2017-1-1', '2017-1-1', '1');
INSERT INTO `writing_db`.`lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`) VALUES ('Oleg loves goats', '1', '0', '2017-1-1', '2017-1-1', '1');
INSERT INTO `writing_db`.`lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`) VALUES ('Kyle likes candy', '2', '1', '2017-1-1', '2017-1-1', '1');
INSERT INTO `writing_db`.`lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`) VALUES ('Kyle asldfnalsdkjflasdjkf', '2', '0', '2017-1-1', '2017-1-1', '1');
INSERT INTO `writing_db`.`lines` (`lineText`, `lineOrder`, `lineSelected`, `createdAt`, `updatedAt`, `StoryId`) VALUES ('Kyle eats pie', '2', '0', '2017-1-1', '2017-1-1', '1');

SELECT * FROM writing_db.`lines`;
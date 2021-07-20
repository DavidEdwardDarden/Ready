USE [master]

IF db_id('Ready') IS NULL
  CREATE DATABASE [Ready]
GO

USE [Ready]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Questions];
DROP TABLE IF EXISTS [Category];

GO


CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY,
  [FirebaseUserId] varchar(255),
  [CreateDateTime] datetime,
  [FirstName] varchar(255),
  [LastName] varchar(255),
  [Email] varchar(255),
  [UserName] varchar(255),
  [IsDeleted] bit
)

CREATE TABLE [Questions] (
  [Id] int PRIMARY KEY,
  [CategoryId] int,
  [UserProfileId] int,
  [QuestionContent] varchar(255),
  [AnswerContent] varchar(255),
  [Learned] bit,
  [IsDeleted] bit,
  [CreateDateTime] datetime
)

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY,
  [Title] varchar(255),
  [IsDeleted] bit


CONSTRAINT [FK_Questions_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
CONSTRAINT [FK_PostReaction_Reaction] FOREIGN KEY ([ReactionId]) REFERENCES [Reaction] ([Id])

)
GO
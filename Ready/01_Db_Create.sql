USE [master]
GO

IF db_id('Ready') IS NOT NULL
BEGIN
  ALTER DATABASE [Ready] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [Ready]
END
GO

CREATE DATABASE [Ready]
GO

USE [Ready]
GO

---------------------------------------------------------------------------




CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY,
  [fierbaseUserId] nvarchar(255),
  [createDateTime] datetime,
  [fname] nvarchar(255),
  [lname] nvarchar(255),
  [email] nvarchar(255),
  [username] nvarchar(255),
  [password] nvarchar(255)
)
GO

CREATE TABLE [Questions] (
  [id] int PRIMARY KEY,
  [question_Number] int,
  [my_Question] bit,
  [userId] int,
  [question] nvarchar(255),
  [answer] nvarchar(255),
  [learned] bit,
  [isDeleted] bit,
  [created] datetime
)
GO

ALTER TABLE [questions] ADD FOREIGN KEY ([userId]) REFERENCES [UserProfile] ([id])
GO
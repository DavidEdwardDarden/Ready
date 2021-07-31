using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Ready.Models;
using Ready.Utils;

namespace Ready.Repositories
{
    public class QuestionRepository : BaseRepository, IQuestionRepository
    {
        public QuestionRepository(IConfiguration config) : base(config) { }

        public List<Question> GetAllQuestions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserProfileId, QuestionContent, AnswerContent, Learned, CreateDateTime, CategoryId
                        FROM Questions";
                    var reader = cmd.ExecuteReader();

                    var questions = new List<Question>();

                    while (reader.Read())
                    {
                        questions.Add(new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionContent = reader.GetString(reader.GetOrdinal("QuestionContent")),
                            AnswerContent = reader.GetString(reader.GetOrdinal("AnswerContent")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Learned = DbUtils.GetBoolean(reader, "Learned"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });
                    }

                    reader.Close();

                    return questions;
                }
            }
        }

        public List<Question> GetAllQuestionsByCategoryId(int CategoryId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserProfileId, QuestionContent, AnswerContent, Learned, CreateDateTime, CategoryId
                        FROM Questions
                        WHERE CategoryId = @CategoryId AND Learned = 0";

                    cmd.Parameters.AddWithValue("@CategoryId", CategoryId);


                    SqlDataReader reader = cmd.ExecuteReader();

                    var questions = new List<Question>();


                    while (reader.Read())
                    {
                        questions.Add(new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionContent = reader.GetString(reader.GetOrdinal("QuestionContent")),
                            AnswerContent = reader.GetString(reader.GetOrdinal("AnswerContent")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Learned = DbUtils.GetBoolean(reader, "Learned"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });

                      
                    }

                    reader.Close();
                    return questions;

                  
                }
            }
        }


        public List<Question> GetAllQuestionsByFirebaseUserIdandCategoryId(int CategoryId, string FirebaseUserId )
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT q.Id, q.UserProfileId, q.QuestionContent, q.AnswerContent, q.Learned, q.CreateDateTime, q.CategoryId
                        FROM Questions q
                         LEFT JOIN Category cat ON q.CategoryId = cat.Id
                        LEFT JOIN UserProfile up ON q.UserProfileId = up.Id
                        WHERE CategoryId = @CategoryId AND FirebaseUserId= @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@CategoryId", CategoryId);

                    //I COULD ALSO USE?:
                    //cmd.Parameters.AddWithValue("@UserProfileId", UserProfileId);
                    //cmd.Parameters.AddWithValue("@CategoryId", CategoryId);


                    SqlDataReader reader = cmd.ExecuteReader();

                    var questions = new List<Question>();


                    while (reader.Read())
                    {
                        questions.Add(new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionContent = reader.GetString(reader.GetOrdinal("QuestionContent")),
                            AnswerContent = reader.GetString(reader.GetOrdinal("AnswerContent")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Learned = DbUtils.GetBoolean(reader, "Learned"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });


                    }

                    reader.Close();
                    return questions;


                }
            }
        }

        public List<Question> GetAllQuestionsByFirebaseUserId(string FirebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT q.Id, q.UserProfileId, q.QuestionContent, q.AnswerContent, q.Learned, q.CreateDateTime, q.CategoryId
                        FROM Questions q
                        LEFT JOIN UserProfile up ON q.UserProfileId = up.Id
                        WHERE FirebaseUserId= @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", FirebaseUserId);

                    //I COULD ALSO USE?:
                    //cmd.Parameters.AddWithValue("@UserProfileId", UserProfileId);
                    //cmd.Parameters.AddWithValue("@CategoryId", CategoryId);


                    SqlDataReader reader = cmd.ExecuteReader();

                    var questions = new List<Question>();


                    while (reader.Read())
                    {
                        questions.Add(new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionContent = reader.GetString(reader.GetOrdinal("QuestionContent")),
                            AnswerContent = reader.GetString(reader.GetOrdinal("AnswerContent")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Learned = DbUtils.GetBoolean(reader, "Learned"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });


                    }

                    reader.Close();
                    return questions;


                }
            }
        }

        public void DeleteQuestionById(int Id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Delete FROM Questions 
                            WHERE Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditQuestion(Question question)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Questions 
                    SET QuestionContent = @QuestionContent, AnswerContent = @AnswerContent
                    WHERE id = @id
                ";

                    cmd.Parameters.AddWithValue("@QuestionContent", question.QuestionContent);
                    cmd.Parameters.AddWithValue("@AnswerContent", question.AnswerContent);
                    cmd.Parameters.AddWithValue("@id", question.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Question GetQuestionById(int Id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserProfileId, QuestionContent, AnswerContent, Learned, CreateDateTime, CategoryId
                        FROM Questions
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", Id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Question question = new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            QuestionContent = reader.GetString(reader.GetOrdinal("QuestionContent")),
                            AnswerContent = reader.GetString(reader.GetOrdinal("AnswerContent")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Learned = DbUtils.GetBoolean(reader, "Learned"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        };

                        reader.Close();
                        return question;
                    }

                    reader.Close();
                    return null;
                }
            }
        }

        public void AddQuestion(Question question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Questions (UserProfileId, QuestionContent, AnswerContent, Learned, CreateDateTime, CategoryId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserProfileId, @QuestionContent, @AnswerContent, @Learned, @CreateDateTime, @CategoryId)";
                    DbUtils.AddParameter(cmd,"@UserProfileId", question.UserProfileId);
                    DbUtils.AddParameter(cmd,"@QuestionContent", question.QuestionContent);
                    DbUtils.AddParameter(cmd,"@AnswerContent", question.AnswerContent);
                    DbUtils.AddParameter(cmd,"@Learned", question.Learned);
                    DbUtils.AddParameter(cmd,"@CreateDateTime", question.CreateDateTime);
                    DbUtils.AddParameter(cmd,"@CategoryId", question.CategoryId);
                    question.Id = (int)cmd.ExecuteScalar();


                    //COULD HAVE USED THE FOLLOWING... WHAT IS THE DIFFERENCE?
                    //cmd.Parameters.AddWithValue("@CategoryId", question.CategoryId);

                    question.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}

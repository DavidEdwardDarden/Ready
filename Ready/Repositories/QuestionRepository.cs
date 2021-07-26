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

        public Question GetQuestionById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserProfileId, QuestionContent, AnswerContent, Learned, CreateDateTime, CategoryId
                        FROM Questions
                        WHERE Id = @id AND Learned = 0";

                    cmd.Parameters.AddWithValue("@id", id);

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
                            CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime")
                        };

                        reader.Close();
                        return question;
                    }

                    reader.Close();
                    return null;
                }
            }
        }

    }
}

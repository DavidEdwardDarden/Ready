using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                    cmd.CommandText = "SELECT Id, QuestionContent FROM Questions";
                    var reader = cmd.ExecuteReader();

                    var questions = new List<Question>();

                    while (reader.Read())
                    {
                        questions.Add(new Question()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            QuestionContent = reader.GetString(reader.GetOrdinal("QuestionContent")),
                        });
                    }

                    reader.Close();

                    return questions;
                }
            }
        }

    }
}

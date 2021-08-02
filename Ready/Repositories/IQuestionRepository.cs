using Ready.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ready.Repositories
{
    public interface IQuestionRepository
    {
        List<Question> GetAllQuestions();

        List<Question> GetAllQuestionsByCategoryId(int id);

        List<Question> GetAllQuestionsByFirebaseUserIdandCategoryId(int CategoryId, string FirebaseUserId);

        List<Question> GetAllQuestionsByFirebaseUserId(string FirebaseUserId);

        public void DeleteQuestionById(int Id);

        public void EditQuestion(Question question);

        public Question GetQuestionById(int Id);

        public void AddQuestion(Question question);

    }
}

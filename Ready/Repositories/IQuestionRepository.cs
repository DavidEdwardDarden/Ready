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
    }
}

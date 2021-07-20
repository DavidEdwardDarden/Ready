using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ready.Models
{
    public class Question
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public string QuestionContent { get; set; }

        public string AnswerContent { get; set; }

        public bool Learned { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreateDateTime { get; set; }

        public int CategoryId { get; set; }
    }
}

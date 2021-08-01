using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ready.Models;
using Ready.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Ready.Controllers
{
    //SET [Authorize] for every INDIVIDUAL thing EXCEPT where you use the helper function AND Login stuff
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _QuestionRepository;
        private readonly IUserProfileRepository _UserProfileRepository;
        public QuestionController(IQuestionRepository QuestionRepository, IUserProfileRepository UserProfileRepository)
        {
            _QuestionRepository = QuestionRepository;
            _UserProfileRepository = UserProfileRepository;
    }

        //-----------------------------------------------------------------------
        //GET ALL QUESTIONS
        // GET: QuestionController
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_QuestionRepository.GetAllQuestions());
        }

        //-----------------------------------------------------------------------
        //GET ALL QUESTIONS BY FIREBASE USER ID AND CATEGORY ID
        // GET: QuestionController
        [HttpGet("Quiz/{CategoryId}")]
        public IActionResult GetAllQuestionsByFirebaseUserIdandCategoryId(int CategoryId)
        {
            //JUST NEED THE CATEGORY ID INITIALLY... THE HELPER FUNCTION ON THIS PAGE SUPPLIES THE FIREBASEUSERID
            var user = GetCurrentUserProfile();
             if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var questions = (_QuestionRepository.GetAllQuestionsByFirebaseUserIdandCategoryId(CategoryId, user.FirebaseUserId));
                if (questions == null)
                {
                    return NotFound();
                }
                return Ok(questions);
            }

        }

        //-----------------------------------------------------------------------
        //GET ALL QUESTIONS BY FIREBASE USER ID
        // GET: QuestionController

        [HttpGet("MyQuestionsList")]
        public IActionResult GetAllQuestionsByFirebaseUserId()
        {

            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var questions = (_QuestionRepository.GetAllQuestionsByFirebaseUserId(user.FirebaseUserId));
                if (questions == null)
                {
                    return NotFound();
                }
                return Ok(questions);
            }
        }

        //---------------------------------------------------------------------
        //DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _QuestionRepository.DeleteQuestionById(id);
            return NoContent();
        }


        //----------------------------------------------------------------------
        //EDIT Question

        [HttpPut("{id}")]
        public IActionResult Put(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _QuestionRepository.EditQuestion(question);
            return Ok(question);
        }

        //---------------------------------------------------------------------
        //GET Question by Id
        [HttpGet("{Id}")]
        public IActionResult Get(int Id)
        {
            var question = _QuestionRepository.GetQuestionById(Id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }


        //---------------------------------------------------------------------
        //ADD Question
        [HttpPost]
        public IActionResult AddQuestion(Question question)
        {

            //There are 7 columns in the Questions table that must be filled to Add an object to the table
            //1. Id (Covered in the return and the question repository)
            //2. UserProfileId(set with helper function below)
            //3. Question Content (coming from front end input)
            //4. Answer Content (coming from front end input)
            //5. Learned (set below)
            //6. CreateDateTime (set below)
            //7. Category Id (MUST COME FROM FRONT END.... don't have set up yet!????????????????????????????????)

            var user = GetCurrentUserProfile(); //#2
            question.UserProfileId = user.Id; //#2
            question.Learned = false; //#5
            DateTime dateCreated = DateTime.Now; //#6
            question.CreateDateTime = dateCreated; //#6
           
           
            _QuestionRepository.AddQuestion(question);
            return CreatedAtAction("Get", new { id = question.Id }, question);


        }

        //--------------------f------------------------------------------------------
        //HELPER FUNCTION!!!!!!!!!!     GET CURRENT USER PROFILE (Get Current Logged In User)
        //This bad boy returns the whole user object... I'm pretty sure...THE WHOLE OBJECT!  The whole user object
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            if (firebaseUserId != null)
            {
                return _UserProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            else
            {
                return null;
            }



        }

        //--------------------f------------------------------------------------------
        //HELPER FUNCTION!!!!!!!!!!     GET CURRENT USER PROFILE ID(Get Current Logged In User)
        //This bad boy returns the whole user object... I'm pretty sure
        //private UserProfile GetCurrentUserProfileId()
        //{
            
        //    int UserProfileId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        //    //UserProfileId = parseInt(UserProfileId);

        //    if (UserProfileId != 0)
        //    {
        //        return _UserProfileRepository.GetUserById(UserProfileId);
        //    }
        //    else
        //    {
        //        return null;
        //    }



        //}

    }
}

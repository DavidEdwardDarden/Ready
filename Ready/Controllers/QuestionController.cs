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
            var tag = _QuestionRepository.GetQuestionById(Id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }


        //---------------------------------------------------------------------
        //ADD Question
        [HttpPost]
        public IActionResult AddQuestion(Question question)
        {

          
            DateTime dateCreated = DateTime.Now;
            question.Learned = false;

            _QuestionRepository.AddQuestion(question);
            return CreatedAtAction("Get", new { id = question.Id }, question);


        }

        //--------------------f------------------------------------------------------
        //HELPER FUNCTION!!!!!!!!!!     GET CURRENT USER PROFILE (Get Current Logged In User)
        //This bad boy returns the whole user object... I'm pretty sure
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
        //HELPER FUNCTION!!!!!!!!!!     GET CURRENT USER PROFILE (Get Current Logged In User)
        //This bad boy returns the whole user object... I'm pretty sure
        private UserProfile GetCurrentUserProfileId()
        {
            
            var UserProfileId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //UserProfileId = parseInt(UserProfileId);

            if (UserProfileId != null)
            {
                return _UserProfileRepository.GetUserById(UserProfileId);
            }
            else
            {
                return null;
            }



        }


        //----------------------------------------------------------------------
        //GET A CATEGORY BY ID
        //[HttpGet("{CategoryId}")]
        //public IActionResult Get(int CategoryId)
        //{
        //    var question = _QuestionRepository.GetAllQuestionsByCategoryId(CategoryId);
        //    if (question == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(question);
        //}

        //----------------------------------------------------------------------

        //    // GET: QuestionController
        //    public ActionResult Index()
        //    {
        //        return View();
        //    }

        //    // GET: QuestionController/Details/5
        //    public ActionResult Details(int id)
        //    {
        //        return View();
        //    }

        //    // GET: QuestionController/Create
        //    public ActionResult Create()
        //    {
        //        return View();
        //    }

        //    // POST: QuestionController/Create
        //    [HttpPost]
        //    [ValidateAntiForgeryToken]
        //    public ActionResult Create(IFormCollection collection)
        //    {
        //        try
        //        {
        //            return RedirectToAction(nameof(Index));
        //        }
        //        catch
        //        {
        //            return View();
        //        }
        //    }

        //    // GET: QuestionController/Edit/5
        //    public ActionResult Edit(int id)
        //    {
        //        return View();
        //    }

        //    // POST: QuestionController/Edit/5
        //    [HttpPost]
        //    [ValidateAntiForgeryToken]
        //    public ActionResult Edit(int id, IFormCollection collection)
        //    {
        //        try
        //        {
        //            return RedirectToAction(nameof(Index));
        //        }
        //        catch
        //        {
        //            return View();
        //        }
        //    }

        //    // GET: QuestionController/Delete/5
        //    public ActionResult Delete(int id)
        //    {
        //        return View();
        //    }

        //    // POST: QuestionController/Delete/5
        //    [HttpPost]
        //    [ValidateAntiForgeryToken]
        //    public ActionResult Delete(int id, IFormCollection collection)
        //    {
        //        try
        //        {
        //            return RedirectToAction(nameof(Index));
        //        }
        //        catch
        //        {
        //            return View();
        //        }
        //    }
        //}
    }
}

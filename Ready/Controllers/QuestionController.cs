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
        //GET ALL QUESTIONS BY USER ID AND CATEGORY ID
        // GET: QuestionController
        [HttpGet("Quiz/{CategoryId}/{FirebaseUserId}")]
        public IActionResult GetAllQuestionsByFirebaseUserIdandCategoryId(int CategoryId, string FirebaseUserId)
        {
           var questions = (_QuestionRepository.GetAllQuestionsByFirebaseUserIdandCategoryId(CategoryId, FirebaseUserId));
            if (questions == null)
            {
                return NotFound();
            }
            return Ok(questions);
        }

        //-----------------------------------------------------------------------
        //GET ALL QUESTIONS BY FIREBASE USER ID
        // GET: QuestionController

        [HttpGet("MyQuestionsList/{FirebaseUserId}")]
        public IActionResult GetAllQuestionsByFirebaseUserId(string FirebaseUserId)
        {
            var questions = (_QuestionRepository.GetAllQuestionsByFirebaseUserId(FirebaseUserId));
            if (questions == null)
            {
                return NotFound();
            }
            return Ok(questions);
        }




            //---------------------------------------------------------------------
            //GET CURRENT USER PROFILE
            private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _UserProfileRepository.GetByFirebaseUserId(firebaseUserId);
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

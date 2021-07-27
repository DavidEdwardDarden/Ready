using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ready.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ready.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _QuestionRepository;
        public QuestionController(IQuestionRepository QuestionRepository)
        {
            _QuestionRepository = QuestionRepository;
        }

        //-----------------------------------------------------------------------
        //GET ALL QUESTIONS
        // GET: QuestionController
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_QuestionRepository.GetAllQuestions());
        }

        //----------------------------------------------------------------------
        //GET A CATEGORY BY ID
        [HttpGet("{CategoryId}")]
        public IActionResult Get(int CategoryId)
        {
            var question = _QuestionRepository.GetAllQuestionsByCategoryId(CategoryId);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }

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

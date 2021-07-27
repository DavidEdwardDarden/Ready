using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ready.Models;
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

    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        //-----------------------------------------------------------------------
        //GET ALL CATEGORIES
        // GET: CategoryController
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }

        //----------------------------------------------------------------------
        //ADD A CATEGORY NAME
        [HttpPost]
        public IActionResult AddCategory(Category category)
        {
            _categoryRepository.AddCategory(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        //----------------------------------------------------------------------
        //DELETE A CATEGORY

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.DeleteCategory(id);
            return NoContent();
        }

        //----------------------------------------------------------------------
        //GET A CATEGORY BY ID
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        //----------------------------------------------------------------------
        //EDIT CATEGORY

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.EditCategory(category);
            return Ok(category);
        }
    }
}

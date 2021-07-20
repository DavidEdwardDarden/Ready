using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ready.Models;

namespace Ready.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();

        void AddCategory(Category category);

        void DeleteCategory(int categoryId);

        Category GetCategoryById(int id);

        void EditCategory(Category category);
    }
}

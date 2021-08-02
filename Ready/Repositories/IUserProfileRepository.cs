using Ready.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ready.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);

        //void Activate(int id);
        //void Add(UserProfile userProfile);
        UserProfile CheckUnique(UserProfile user);
        //bool Delete(int id);
        //void Edit(UserProfile user);
        List<UserProfile> GetAllUsers();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserById(int id);
    }
}

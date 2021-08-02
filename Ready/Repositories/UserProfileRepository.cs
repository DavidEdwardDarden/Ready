using Microsoft.Extensions.Configuration;
using Ready.Models;
using Ready.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ready.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile CheckUnique(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select count(*) From UserProfile where Email = @email and Id != @id";
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@id", user.Id);
                    var value = cmd.ExecuteScalar();
                    if ((int)value > 0)
                    {
                        user.Email = user.Email + " !!Exists";
                    }
                    cmd.CommandText = "Select count(*) From UserProfile Id != @id";
                    var dnValue = cmd.ExecuteScalar();
                    if ((int)dnValue > 0)
                    {
                        user.FirstName = user.FirstName + " !!Exists";
                    }
                }

            }
            return user;
        }

        //public void Edit(UserProfile toEdit)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"Update UserProfile 
        //                                set FirstName = @firstName,
        //                                    LastName = @lastName,
        //                                    Email = @email,
        //                                    DisplayName = @displayName,
        //                                    ImageLocation = @imageLocation,
        //                                    UserTypeId = @userTypeId
        //                                where Id = @id";
        //            cmd.Parameters.AddWithValue("@firstName", toEdit.FirstName);
        //            cmd.Parameters.AddWithValue("@lastName", toEdit.LastName);
        //            cmd.Parameters.AddWithValue("@email", toEdit.Email);
        //            cmd.Parameters.AddWithValue("@imageLocation", toEdit.ImageLocation);
        //            cmd.Parameters.AddWithValue("@displayName", toEdit.DisplayName);
        //            cmd.Parameters.AddWithValue("@userTypeId", toEdit.UserTypeId);
        //            cmd.Parameters.AddWithValue("@id", toEdit.Id);
        //            cmd.ExecuteNonQuery();
        //        }
        //        conn.Close();
        //    }
        //}
        public List<UserProfile> GetAllUsers()
        {
            List<UserProfile> AllUsers = new List<UserProfile>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT up.Id, up.FirebaseUserId, up.FirstName, up.LastName, up.Email, up.CreateDateTime
                          FROM UserProfile up
                    ";
                    var reader = cmd.ExecuteReader();
                    UserProfile userProfile = null;
                    while (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        };
                        AllUsers.Add(userProfile);
                    };
                    conn.Close();
                    return AllUsers;
                }
            }
        }

        public UserProfile GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.Email, up.CreateDateTime
                          FROM UserProfile up
                          WHERE up.Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    UserProfile userProfile = null;
                    while (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                        };
                    };
                    conn.Close();
                    return userProfile;
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName,
                               up.Email, up.CreateDateTime 
                          FROM UserProfile up
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }
        //public void Activate(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"Update UserProfile 
        //                                set IsDeleted = 0 
        //                                Where Id = @id";
        //            DbUtils.AddParameter(cmd, "@id", id);
        //            cmd.ExecuteScalar();
        //        }
        //        conn.Close();
        //    }
        //}

        //public bool Delete(int id)
        //{
        //    UserProfile testForAdmin = GetUserById(id);
        //    if (testForAdmin.UserTypeId == 2)
        //    {
        //        if (CheckForLastAdmin()) return false;
        //    }
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"Update UserProfile 
        //                                set IsDeleted = 1 
        //                                Where Id = @id";
        //            DbUtils.AddParameter(cmd, "@id", id);
        //            cmd.ExecuteScalar();
        //        }
        //        conn.Close();
        //        return true;
        //    }
        //}
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, 
                                                                 Email, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName,  
                                                @Email, @CreateDateTime)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //private bool CheckForLastAdmin()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                            Select Count(*) From UserProfile
        //                            Where UserTypeId = 2 and IsDeleted = 0";
        //            var admins = cmd.ExecuteScalar();
        //            if ((int)admins == 1)
        //            {
        //                return true;
        //            }
        //        }
        //    }
        //    return false;
        //}


    }
}

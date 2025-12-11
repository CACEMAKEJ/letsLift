using LetsLift.Models;
using MongoDB.Driver;

public class UserRepository {
    private readonly IMongoCollection<User> _users;

    public UserRepository(IMongoClient client, IConfiguration config) {
        var db = client.GetDatabase(config["MongoDb:DatabaseName"]);
        _users = db.GetCollection<User>("Users");
    }

    public Task<User?> GetByEmail(string email) {
        return _users.Find(u => u.Email == email).FirstOrDefaultAsync();
    }

    public Task Create(User user) {
        return _users.InsertOneAsync(user);
    }
}
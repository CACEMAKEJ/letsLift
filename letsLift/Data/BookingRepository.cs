using MongoDB.Driver;

public class BookingRepository
{
    private readonly IMongoCollection<Booking> _collection;

    public BookingRepository(IMongoClient client, IConfiguration config)
    {
        var databaseName = config["MongoDb:DatabaseName"];
        var database = client.GetDatabase(databaseName);

        _collection = database.GetCollection<Booking>("Bookings");
    }

    // Get all bookings (used by users)
    public async Task<List<Booking>> GetAllAsync()
    {
        return await _collection
            .Find(_ => true)
            .SortBy(b => b.StartTime)
            .ToListAsync();
    }

    // Get bookings created by a coach
    public async Task<List<Booking>> GetByCoachAsync(string coachId)
    {
        return await _collection
            .Find(b => b.CoachId == coachId)
            .SortBy(b => b.StartTime)
            .ToListAsync();
    }

    // Create a new booking (coach)
    public async Task AddAsync(Booking booking)
    {
        await _collection.InsertOneAsync(booking);
    }

    // Claim a booking (user)
    public async Task<bool> ClaimAsync(
        string bookingId,
        string userId,
        string userName)
    {
        var filter = Builders<Booking>.Filter.And(
            Builders<Booking>.Filter.Eq(b => b.Id, bookingId),
            Builders<Booking>.Filter.Eq(b => b.BookedByUserId, null)
        );

        var update = Builders<Booking>.Update
            .Set(b => b.BookedByUserId, userId)
            .Set(b => b.BookedByUserName, userName);

        var result = await _collection.UpdateOneAsync(filter, update);

        return result.ModifiedCount == 1;
    }
}
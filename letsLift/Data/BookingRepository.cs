using MongoDB.Driver;
using LetsLift.Models;

namespace LetsLift.Data;

public class BookingRepository
{
    private readonly IMongoCollection<Booking> _collection;

    public BookingRepository(IMongoClient client, IConfiguration config)
    {
        var db = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _collection = db.GetCollection<Booking>("Bookings");
    }

    public Task CreateAsync(Booking booking) =>
        _collection.InsertOneAsync(booking);
}

import Event from '../components/Event';

const Events = () => {
  // Sample events data
  const events = [
    {
      title: "Ethiopian Art Exhibition 2024",
      description: "Join us for a spectacular showcase of contemporary Ethiopian art featuring works from emerging and established artists. Experience the rich cultural heritage and modern artistic expressions.",
      date: "2024-03-15",
      time: "6:00 PM - 9:00 PM",
      location: "National Museum of Ethiopia, Addis Ababa",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
      organizer: "Ethiopian Art Council",
      capacity: 200,
      price: "500",
      category: "Exhibition"
    },
    {
      title: "Traditional Music Festival",
      description: "A celebration of Ethiopia's diverse musical traditions featuring live performances, workshops, and cultural demonstrations. Experience the soul of Ethiopian music.",
      date: "2024-03-22",
      time: "4:00 PM - 10:00 PM",
      location: "Unity Park, Addis Ababa",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      organizer: "Cultural Heritage Foundation",
      capacity: 500,
      price: "300",
      category: "Music"
    },
    {
      title: "Contemporary Photography Workshop",
      description: "Learn the art of storytelling through photography with renowned Ethiopian photographers. Hands-on workshop covering composition, lighting, and post-processing.",
      date: "2024-03-28",
      time: "10:00 AM - 4:00 PM",
      location: "Addis Ababa Institute of Technology",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop",
      organizer: "Photography Society of Ethiopia",
      capacity: 30,
      price: "1500",
      category: "Workshop"
    },
    {
      title: "Street Art Festival",
      description: "Witness the transformation of urban spaces through vibrant street art. Local and international artists will create live murals throughout the city.",
      date: "2024-04-05",
      time: "11:00 AM - 7:00 PM",
      location: "Bole District, Addis Ababa",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
      organizer: "Urban Art Collective",
      capacity: 1000,
      price: "Free",
      category: "Street Art"
    },
    {
      title: "Digital Art Symposium",
      description: "Explore the intersection of technology and art in this comprehensive symposium featuring digital artists, VR experiences, and interactive installations.",
      date: "2024-04-12",
      time: "9:00 AM - 6:00 PM",
      location: "Ethiopian Digital Innovation Hub",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop",
      organizer: "Digital Arts Ethiopia",
      capacity: 150,
      price: "800",
      category: "Digital Art"
    },
    {
      title: "Craft Market & Artisan Fair",
      description: "Discover unique handcrafted items from Ethiopian artisans. From traditional textiles to modern jewelry, support local craftsmanship and creativity.",
      date: "2024-04-19",
      time: "10:00 AM - 6:00 PM",
      location: "Meskel Square, Addis Ababa",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
      organizer: "Ethiopian Artisan Network",
      capacity: 300,
      price: "Free",
      category: "Craft Market"
    },
    {
      title: "Contemporary Dance Performance",
      description: "Experience the fusion of traditional Ethiopian dance with modern contemporary movements. A mesmerizing performance by the Addis Contemporary Dance Company.",
      date: "2024-04-26",
      time: "7:00 PM - 9:00 PM",
      location: "National Theatre, Addis Ababa",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=300&fit=crop",
      organizer: "Addis Contemporary Dance Company",
      capacity: 400,
      price: "750",
      category: "Dance"
    },
    {
      title: "Film Festival: Ethiopian Cinema",
      description: "A week-long celebration of Ethiopian cinema featuring classic films, documentaries, and new releases. Meet filmmakers and attend Q&A sessions.",
      date: "2024-05-03",
      time: "6:00 PM - 11:00 PM",
      location: "Cinema Ethiopia, Addis Ababa",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=300&fit=crop",
      organizer: "Ethiopian Film Association",
      capacity: 200,
      price: "400",
      category: "Film"
    },
    {
      title: "Poetry & Spoken Word Night",
      description: "An evening of powerful poetry and spoken word performances by Ethiopian poets. Share your own work during the open mic session.",
      date: "2024-05-10",
      time: "8:00 PM - 11:00 PM",
      location: "Fendika Cultural Center, Addis Ababa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      organizer: "Addis Poetry Collective",
      capacity: 80,
      price: "200",
      category: "Poetry"
    },
    {
      title: "Sculpture & Installation Art Show",
      description: "Explore three-dimensional art forms in this unique exhibition featuring sculptures, installations, and interactive art pieces by local artists.",
      date: "2024-05-17",
      time: "11:00 AM - 7:00 PM",
      location: "Addis Ababa Museum of Modern Art",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
      organizer: "Modern Art Society of Ethiopia",
      capacity: 150,
      price: "600",
      category: "Sculpture"
    },
    {
      title: "Jazz & Blues Festival",
      description: "A soulful evening of jazz and blues music featuring both Ethiopian and international artists. Enjoy live music under the stars.",
      date: "2024-05-24",
      time: "6:00 PM - 12:00 AM",
      location: "Jazzamba Lounge, Addis Ababa",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      organizer: "Addis Jazz Society",
      capacity: 120,
      price: "1000",
      category: "Jazz"
    }
  ];

  return (
    <div className='p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Upcoming Events</h1>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Discover amazing art events, exhibitions, and cultural experiences happening in Ethiopia
          </p>
        </div>

        {/* Events Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {events.map((event, index) => (
            <Event key={index} {...event} />
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <p className='text-gray-600 mb-4'>Don&apos;t see an event you&apos;re interested in?</p>
          <button className='bg-[#2cb1bc] hover:bg-[#14919b] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200'>
            Suggest an Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;

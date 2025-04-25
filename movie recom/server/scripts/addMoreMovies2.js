import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

const additionalMovies = [
  {
    title: "Everything Everywhere All at Once",
    description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    genre: ["Action", "Adventure", "Comedy"],
    releaseYear: 2022,
    rating: 8.7,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    duration: 139
  },
  {
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2022,
    rating: 7.9,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"],
    duration: 176
  },
  {
    title: "Top Gun: Maverick",
    description: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    genre: ["Action", "Drama"],
    releaseYear: 2022,
    rating: 8.3,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Jennifer Connelly", "Miles Teller"],
    duration: 130
  },
  {
    title: "The Northman",
    description: "A young Viking prince is on a quest to avenge his father's murder.",
    genre: ["Action", "Adventure", "Drama"],
    releaseYear: 2022,
    rating: 7.0,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMzVlMmY2NTctODgwOC00NDMzLWEzMWYtM2RiYmIyNTNhMTI0XkEyXkFqcGdeQXVyNTAzNzgwNTc@._V1_.jpg",
    director: "Robert Eggers",
    cast: ["Alexander Skarsgård", "Nicole Kidman", "Claes Bang"],
    duration: 137
  },
  {
    title: "Nope",
    description: "The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery.",
    genre: ["Horror", "Mystery", "Sci-Fi"],
    releaseYear: 2022,
    rating: 7.0,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZjI4YjU0YzQtYjU5Ny00YzQ0LTk0YzAtYzQ5YjY5YjU0YzQ0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Keke Palmer", "Steven Yeun"],
    duration: 130
  },
  {
    title: "The Banshees of Inisherin",
    description: "Two lifelong friends find themselves at an impasse when one abruptly ends their relationship, with alarming consequences for both of them.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2022,
    rating: 7.8,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMmYyOTgwYWItYmU3Ny00M2E2LTk0NWMtMDVlNmQ0MWZiMTMxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    director: "Martin McDonagh",
    cast: ["Colin Farrell", "Brendan Gleeson", "Kerry Condon"],
    duration: 114
  },
  {
    title: "Triangle of Sadness",
    description: "A fashion model celebrity couple join an eventful cruise for the super-rich.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2022,
    rating: 7.4,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNDRiZjc0ZDMtMjhlYi00ZjAzLTg0MDQtZDI2NGEyYTBlNTA5XkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_.jpg",
    director: "Ruben Östlund",
    cast: ["Harris Dickinson", "Charlbi Dean", "Dolly de Leon"],
    duration: 147
  },
  {
    title: "The Menu",
    description: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
    genre: ["Comedy", "Horror", "Thriller"],
    releaseYear: 2022,
    rating: 7.2,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMzdjNjI5MmYtODhiNS00NTcyLWEzZmUtYzVmODM5YzExNDE3XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_.jpg",
    director: "Mark Mylod",
    cast: ["Ralph Fiennes", "Anya Taylor-Joy", "Nicholas Hoult"],
    duration: 107
  },
  {
    title: "Glass Onion: A Knives Out Mystery",
    description: "Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.",
    genre: ["Comedy", "Crime", "Drama"],
    releaseYear: 2022,
    rating: 7.2,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYmZlZDZkZjYtNzE5Mi00ODFhLTk2OTgtZWVmODBiZTI4NGFiXkEyXkFqcGdeQXVyMTE5MTg5NDIw._V1_.jpg",
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Edward Norton", "Janelle Monáe"],
    duration: 139
  },
  {
    title: "The Fabelmans",
    description: "Growing up in post-World War II era Arizona, young Sammy Fabelman aspires to become a filmmaker as he reaches adolescence, but soon discovers a shattering family secret and explores how the power of films can help him see the truth.",
    genre: ["Drama"],
    releaseYear: 2022,
    rating: 7.6,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZGM1MzczNmQtMjM4Yy00YjQ3LWIyNjYtMDhmYzY2ZjIxM2M1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    director: "Steven Spielberg",
    cast: ["Gabriel LaBelle", "Michelle Williams", "Paul Dano"],
    duration: 151
  },
  {
    title: "Tár",
    description: "Set in the international world of classical music, the film centers on Lydia Tár, widely considered one of the greatest living composer-conductors and first-ever female music director of a major German orchestra.",
    genre: ["Drama", "Music"],
    releaseYear: 2022,
    rating: 7.4,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2I0ZDcyODMtMGE5MC00MjUwLWI1OGYtMWYwYzcxNzU5YzU0XkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_.jpg",
    director: "Todd Field",
    cast: ["Cate Blanchett", "Noémie Merlant", "Nina Hoss"],
    duration: 158
  },
  {
    title: "Babylon",
    description: "A tale of outsized ambition and outrageous excess, it traces the rise and fall of multiple characters during an era of unbridled decadence and depravity in early Hollywood.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2022,
    rating: 7.1,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNjlkYjc4NGMtZjc3MS00NjQ3LTk4MmUtMTkwZGZjODE1ZDVlXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    director: "Damien Chazelle",
    cast: ["Brad Pitt", "Margot Robbie", "Diego Calva"],
    duration: 189
  },
  {
    title: "The Whale",
    description: "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter.",
    genre: ["Drama"],
    releaseYear: 2022,
    rating: 7.7,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZDIyYjM3N2EtOTU0MC00ODg0LThlOGYtZTI5YTM0Y2Q5YjljXkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg",
    director: "Darren Aronofsky",
    cast: ["Brendan Fraser", "Sadie Sink", "Hong Chau"],
    duration: 117
  },
  {
    title: "Women Talking",
    description: "Do nothing. Stay and fight. Or leave. In 2010, the women of an isolated religious community grapple with reconciling their reality with their faith.",
    genre: ["Drama"],
    releaseYear: 2022,
    rating: 7.5,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZTc4MjU0NDgtYjU5Yi00NDlkLWFmYjYtYjU0NDRjYzU5YjI0XkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_.jpg",
    director: "Sarah Polley",
    cast: ["Rooney Mara", "Claire Foy", "Jessie Buckley"],
    duration: 104
  },
  {
    title: "Aftersun",
    description: "Sophie reflects on the shared joy and private melancholy of a holiday she took with her father twenty years earlier. Memories real and imagined fill the gaps between as she tries to reconcile the father she knew with the man she didn't.",
    genre: ["Drama"],
    releaseYear: 2022,
    rating: 7.7,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTM1OTYwNzUyOV5BMl5BanBnXkFtZTcwNTY5OTI1Nw@@._V1_.jpg",
    director: "Charlotte Wells",
    cast: ["Paul Mescal", "Frankie Corio", "Celia Rowlson-Hall"],
    duration: 101
  },
  {
    title: "Decision to Leave",
    description: "A detective investigating a man's death in the mountains meets the dead man's mysterious wife in the course of his dogged sleuthing.",
    genre: ["Crime", "Drama", "Mystery"],
    releaseYear: 2022,
    rating: 7.3,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BOTY4YjA2MmUtMTY3Zi00YzQ0LTg1YWYtN2Y4YzlmOWY5YzU0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    director: "Park Chan-wook",
    cast: ["Tang Wei", "Park Hae-il", "Lee Jung-hyun"],
    duration: 138
  },
  {
    title: "RRR",
    description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.",
    genre: ["Action", "Drama"],
    releaseYear: 2022,
    rating: 7.8,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Ajay Devgn"],
    duration: 187
  },
  {
    title: "The Quiet Girl",
    description: "A quiet, neglected girl is sent away from her dysfunctional family to live with foster parents for the summer. She blossoms in their care, but in this house where there are meant to be no secrets, she discovers one.",
    genre: ["Drama"],
    releaseYear: 2022,
    rating: 7.6,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg",
    director: "Colm Bairéad",
    cast: ["Catherine Clinch", "Carrie Crowley", "Andrew Bennett"],
    duration: 94
  },
  {
    title: "All Quiet on the Western Front",
    description: "A young German soldier's terrifying experiences and distress on the western front during World War I.",
    genre: ["Action", "Drama", "War"],
    releaseYear: 2022,
    rating: 7.8,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYTE1MmZiMWYtYTFmZi00YjA3LWI2ODgtMWFlNWYxZjdmNGE3XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg",
    director: "Edward Berger",
    cast: ["Felix Kammerer", "Albrecht Schuch", "Aaron Hilmer"],
    duration: 147
  },
  {
    title: "The Banshees of Inisherin",
    description: "Two lifelong friends find themselves at an impasse when one abruptly ends their relationship, with alarming consequences for both of them.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2022,
    rating: 7.8,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMmYyOTgwYWItYmU3Ny00M2E2LTk0NWMtMDVlNmQ0MWZiMTMxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    director: "Martin McDonagh",
    cast: ["Colin Farrell", "Brendan Gleeson", "Kerry Condon"],
    duration: 114
  }
];

const addMoreMovies = async () => {
  try {
    // MongoDB connection string
    const MONGODB_URI = 'mongodb://127.0.0.1:27017/movie-recommendations';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully');

    // Insert additional movies
    console.log('Inserting additional movies...');
    await Movie.insertMany(additionalMovies);
    console.log('Additional movies inserted successfully');

    // Verify the insertion
    const count = await Movie.countDocuments();
    console.log(`Total movies in database: ${count}`);

    const movies = await Movie.find({});
    console.log('All movies in database:');
    movies.forEach(movie => {
      console.log(`- ${movie.title} (${movie.releaseYear})`);
    });

  } catch (error) {
    console.error('Error adding movies:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

addMoreMovies(); 
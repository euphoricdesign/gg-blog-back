import "reflect-metadata";
import AppDataSource from "../config/data-source";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log("Conexión a la base de datos establecida.");

    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    const user = userRepository.create({
      username: "juanperez",
      password: "password123",
      email: "juan.perez@example.com",
    });
    await userRepository.save(user);

    const posts = [
        {
            title: "Spotted: Serena and Dan's secret rendezvous",
            content: "Who would’ve thought that these two would rekindle the flame? Our little birds have spotted Serena and Dan getting cozy at [location]. Could it be that love finds a way? Or is this just a summer fling? Only time will tell...",
            image: "https://www.losandes.com.ar/resizer/v2/YP3GEZSBNNDEZEBSKPFQZQPDJU.png?quality=75&smart=true&auth=f05703f52d0a35a17b796265c02fc8fe09b5cad6a46812a20b953a52b92e2d43&width=980&height=640",
            createdAt: new Date().toISOString(),
        },
        {
            title: "Chuck Bass's latest conquest",
            content: "The city’s most eligible bachelor is at it again. Our spies have learned that Chuck Bass has set his sights on a new target. Is it a socialite, a model, or perhaps a mysterious newcomer? Only time will tell. But one thing’s for sure, Chuck always gets what he wants.",
            image: "https://archive.themedium.ca/wp-content/uploads/2010/10/chuck-bass-1.jpg",
            createdAt: new Date().toISOString(),
        },
        {
            title: "Blair Waldorf's latest fashion faux pas?",
            content: "Our Queen B is always on top of her fashion game, but even the best of us have off days. Has Blair made a major style blunder at the latest event? Some say her new look is too daring, while others think it’s pure genius. What do you think, Upper East Siders?",
            image: "https://i.pinimg.com/736x/fc/72/f3/fc72f3f8c8b0390a4b86af26c337289e.jpg",
            createdAt: new Date().toISOString(),
        },
    ]

  
    posts.map(async (post) => {
        const newPost = postRepository.create({
            title: post.title,
            content: post.content,
            image: post.image,
            createdAt: new Date().toISOString(),
            author: user, // Relacionar el post con el usuario
          });
          await postRepository.save(newPost);
    })

    console.log("Datos de seed insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos de seed:", error);
  } 
}

seed();

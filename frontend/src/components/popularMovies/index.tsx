import { Carousel } from "primereact/carousel";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./style.css";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getPopularMovies = async () => {
    try {
      const response = await api.get("movie/popular");
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const cardMovies = (movie: Movie) => {
    return (
      <div className="w-[300px] flex flex-col justify-center items-center py-5 px-5 hover:bg-white transition duration-1000">
        <div>
          <img
            className="w-full h-auto bg-cover bg-center rounded-md"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="h-[200px] flex flex-col justify-between">
          <p className="w-full flex justify-center font-bold mt-1">
            {movie.title}
          </p>
          <div>
            <p className="flex flex-col justify-center mb-3">
              {movie.overview.length > 150
                ? movie.overview.slice(0, 150) + `...`
                : movie.overview}
              {movie.overview == "" ? "Sem descrição" : ""}
            </p>
            <Link
              className="text-blue-800 hover:text-blue-400 transition duration-300"
              to={`/movie/${movie.id}`}
            >
              Ver mais
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-300 px-24">
        <Carousel
          value={movies}
          numScroll={1}
          numVisible={3}
          itemTemplate={cardMovies}
          circular
          autoplayInterval={10000}
          responsiveOptions={responsiveOptions}
        />
      </div>
    </>
  );
}

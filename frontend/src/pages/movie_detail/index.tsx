import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

type ProductionCompany = {
  id: number;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  iso_639_1: string;
  name: string;
  english_name: string;
};

type Movie = {
  poster_path: string;
  title: string;
  original_title: string;
  popularity: number;
  overview: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  vote_average: number;
  vote_count: number;

  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
};

export default function MovieDetail() {
  const { idMovie } = useParams();
  const [movie, setMovie] = useState<Movie>({} as Movie);

  const getMovie = async () => {
    try {
      const response = await api.get(`movie/${idMovie}`);
      console.log(response.data);
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="mx-10 my-10 h-screen select-none gap-5 flex flex-col">
      <Link to={"/"} className="bg-gray-300 p-2 w-24 rounded-md flex justify-center hover:bg-blue-200 transition duration-500">
        Voltar
      </Link>

      <div className="bg-slate-100 rounded-md flex flex-col justify-center gap-3">
        <div className="bg-white rounded-t-md flex flex-row gap-20 p-5">
          <img
            className="w-56"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl mb-5 flex flex-row items-baseline">
              {movie.title}
              <p className="text-xs">{movie.original_title}</p>
            </h1>

            <div className="flex flex-row gap-10 justify-between">
              <p>Lançamento: {movie.release_date}</p>
              <p>Duração: {movie.runtime} minutos</p>
            </div>

            <p>Receita: R${movie.revenue}</p>
            <div className="flex flex-row gap-10 justify-between">
              <p>Média de votos: {movie.vote_average}</p>
              <p>Contagem de votos: {movie.vote_count}</p>
            </div>
            <p>Popularidade: {movie.popularity}</p>
          </div>
        </div>
        <div className="bg-white px-20 py-10 w-[900px] flex flex-col gap-3">
          <p className="flex flex-col mb-4">
            <strong>Resumo:</strong> {movie.overview}
          </p>

          <div className="bg-gray-100 p-5 w-[900px]">
            <h3 className="mb-2">
              <strong>Empresas de Produção:</strong>
            </h3>
            <ul className="ml-7">
              {movie.production_companies?.map((company) => (
                <li key={company.id}>
                  . {company.name} ({company.origin_country})
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 p-5 w-[900px]">
            <h3 className="mb-2">
              <strong>Países de Produção:</strong>
            </h3>
            <ul className="ml-7">
              {movie.production_countries?.map((country, index) => (
                <li key={index}>. {country.name}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 p-5 w-[900px]">
            <h3 className="mb-2">
              <strong>Idiomas Falados:</strong>
            </h3>
            <ul className="ml-7">
              {movie.spoken_languages?.map((lang, index) => (
                <li key={index}>. {lang.english_name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

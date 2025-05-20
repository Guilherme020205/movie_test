import PopularMovies from "../../components/popularMovies";
 
export default function Home() {

  return (
    <div className="mx-10 my-10 h-screen select-none">
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-white hover:text-gray-400 transition duration-1000">Filmes populares</h2>
        <PopularMovies/>
      </div>
    </div>
  );
}

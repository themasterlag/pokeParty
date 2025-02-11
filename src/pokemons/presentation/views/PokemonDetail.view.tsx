import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchPokemon } from '../../domain/domain.pokemon.usecase';
import Pokemon from '../../domain/domain.pokemon.entity';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function PokemonDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const location = useLocation();

  useEffect(() => {
    const getPokemon = async (name: string) => {
      if (id) {
        const data = await fetchPokemon(name);
        setPokemon(data);
      }
    };

    getPokemon(location.pathname.split('/')[2] || '');
  }, [id]);

  if (!pokemon) return <div className="flex h-screen items-center justify-center text-lg">Cargando...</div>;

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-3xl shadow-md border border-gray-200 p-4">

        <CardHeader className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center justify-between w-full">
            <BackButton onClick={() => navigate('/')}/>
            <h2 className="flex-1 text-center text-sm font-bold text-gray-600">
              PC: {pokemon.base_experience || "Desconocido"}
            </h2>
            <div className="w-10"></div>
          </div>

          <Image
            isZoomed
            width={150}
            src={
              pokemon.sprites?.other?.showdown?.front_default
            }
          />

          <h1 className="text-2xl font-bold text-gray-700">
            {pokemon.name?.toUpperCase() || "Desconocido"}
          </h1>
        </CardHeader>


        <CardBody className="flex flex-row items-start justify-between px-4 md:px-10">
          <MainInfo pokemon={pokemon}/>
        </CardBody>

        <HabilidadesSection pokemon={pokemon}/>
        <TipoSection pokemon={pokemon} />
        <EstadisticasBaseSection pokemon={pokemon} />
        <MovimientosSection pokemon={pokemon}/>
      </Card>
    </div>
  );
};

const MainInfo = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-sm md:text-lg font-semibold">{pokemon.height ? `${pokemon.height / 10} m` : "N/A"}</h2>
        <h5 className="text-gray-500 font-medium">Altura</h5>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-sm md:text-lg font-semibold">{pokemon.weight ? `${pokemon.weight / 10} kg` : "N/A"}</h2>
        <h5 className="text-gray-500 font-medium">Peso</h5>
      </div>
    </>
  )
}

const HabilidadesSection = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="flex flex-col gap-4 mt-3">
      <h5 className="text-lg font-bold text-center text-gray-700">Habilidades</h5>
      <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
        {pokemon.abilities?.length > 0 ? (
          pokemon.abilities.map((abilityObj) => (
            <span key={abilityObj.ability.name} className="bg-yellow-400 text-white px-3 py-1 rounded-lg shadow-md text-sm md:text-base">
              {abilityObj.ability.name.toUpperCase()}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No disponible</span>
        )}
      </div>
    </div>)
}

const TipoSection = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="flex flex-col gap-4 mt-3">
      <h5 className="text-lg font-bold text-center text-gray-700">Tipo</h5>
      <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
        {pokemon.types?.length > 0 ? (
          pokemon.types.map((typeObj) => (
            <span key={typeObj.type.name} className={`px-3 py-1 rounded-lg shadow-md text-sm md:text-base ${getTypeColor(typeObj.type.name)}`}>
              {typeObj.type.name.toUpperCase()}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No disponible</span>
        )}
      </div>
    </div>)
}

const EstadisticasBaseSection = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="mt-4 px-4 md:px-5">
      <h5 className="text-lg font-bold text-center text-gray-700">Estadísticas Base</h5>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {pokemon.stats?.length > 0 ? (
          pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="flex justify-between bg-gray-100 rounded-lg px-3 py-1 text-sm md:text-base">
              <span className="text-gray-600 font-semibold">{stat.stat.name.toUpperCase()}</span>
              <span className="font-bold">{stat.base_stat}</span>
            </div>
          ))
        ) : (
          <span className="text-gray-500 text-sm text-center">No disponible</span>
        )}
      </div>
    </div>)
}

const MovimientosSection = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="mt-4 px-4 md:px-5 pb-5">
      <h5 className="text-lg font-bold text-center text-gray-700">Movimientos</h5>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {pokemon.moves?.length > 0 ? (
          pokemon.moves.slice(0, 4).map((move) => (
            <span key={move.move.name} className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md text-sm md:text-base">
              {move.move.name.replace("-", " ").toUpperCase()}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No disponible</span>
        )}
      </div>
    </div>)
}

const BackButton = ({ onClick }: { onClick: (() => void) }) => {
  return (
    <button className="button" onClick={onClick}>
      <div className="button-box">
        <span className="button-elem">
          <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
          </svg>
        </span>
        <span className="button-elem">
          <svg viewBox="0 0 46 40">
            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
          </svg>
        </span>
      </div>
    </button>
  )
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    poison: "bg-purple-500 text-white",
    electric: "bg-yellow-500 text-black",
    ground: "bg-yellow-700 text-white",
    flying: "bg-indigo-500 text-white",
    psychic: "bg-pink-500 text-white",
    rock: "bg-gray-500 text-white",
    bug: "bg-green-700 text-white",
    dragon: "bg-purple-800 text-white",
    dark: "bg-gray-900 text-white",
    steel: "bg-gray-400 text-white",
    fairy: "bg-pink-300 text-white",
    ghost: "bg-indigo-900 text-white",
    fighting: "bg-red-800 text-white",
    ice: "bg-blue-300 text-black",
    normal: "bg-gray-400 text-white"
  };
  return colors[type] || "bg-gray-500 text-white";
};

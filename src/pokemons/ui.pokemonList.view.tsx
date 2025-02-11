// src/presentation/components/PokemonList.tsx
import { useEffect, useState } from 'react';
import { filterPokemonList } from './domain.pokemon.usecase';
import Pokemon from './domain.pokemon.entity';
import { Button, Card, CardBody, CardHeader, Image, Input } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { SkeletonLoader } from '../core/components/skeletonLoader';

export default function PokemonList() {
    const navigate = useNavigate();
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");

    const getPokemonList = async () => {
        setLoading(true);
        setPokemonList(await filterPokemonList());
        setLoading(false);
    };

    const filterPokemon = async (name: string) => {
        setLoading(true);
        setPokemonList(await filterPokemonList(name, 5000));
        setLoading(false);
    };

    const playCrie = (src: string) => {
        new Audio(src).play();
    };

    useEffect(() => {
        getPokemonList();
    }, []);

    return (
        <div>
            <Card className='w-2/3 mx-auto mt-10'>
                <CardHeader>
                    <div className='w-full flex'>
                        <span className='text-2xl font-bold text-center text-pink-600 ml-auto mr-auto'>
                            Lista Pokemons
                        </span>
                    </div>
                </CardHeader>
                <CardBody>

                    <div className="flex wrap justify-center mb-5 gap-3">
                        <Input
                            label='Buscar Pokémon'
                            placeholder='Nombre del Pokémon'
                            className='w-2/4'
                            variant='faded'
                            onValueChange={(e) => setNameFilter(e)}
                            onKeyDown={(e) => e.key === "Enter" ? filterPokemon(nameFilter) : null}
                        />
                        <Button className='text-2xl h-100' color='warning' onPress={() => filterPokemon(nameFilter)}>
                            🔎
                        </Button>
                        <Button className='h-100' color='success' onPress={getPokemonList}>
                            <strong>Actualizar</strong>
                        </Button>
                    </div>


                    <div className='flex flex-wrap justify-center gap-8'>
                        {
                            loading ?
                                Array.from({ length: 9 }).map((_) => (<SkeletonLoader />))
                                :
                                pokemonList.map((pokemon) => (
                                    <PokemonCard pokemon={pokemon} onPress={() => { playCrie(pokemon.cries.latest); navigate(`/pokemon/${pokemon.name}`) }} />
                                ))
                        }
                    </div>
                </CardBody>
            </Card>
        </div >
    );
};

const PokemonCard = ({ pokemon, onPress }: { pokemon: Pokemon, onPress: (() => void) }) => {
    return (
        <Card isPressable
            className='p-2 w-1/4 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 hover:cursor-pointer hover:text-blue-400'
            onPress={onPress}>
            <CardHeader>
                <span className='text-2xl font-bold ml-auto mr-auto capitalize'>
                    {pokemon.name}
                </span>
            </CardHeader>
            <CardBody>
                <div className='flex justify-center'>
                    <Image src={pokemon.sprites.other.home.front_default ?? pokemon.sprites.other.dream_world.front_default ?? pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} isBlurred />
                </div>
            </CardBody>
        </Card>
    )
}
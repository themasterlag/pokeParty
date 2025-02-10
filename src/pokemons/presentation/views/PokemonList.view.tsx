// src/presentation/components/PokemonList.tsx
import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../domain/usecases/pokemon.usecase';
import { Pokemon } from '../../domain/entities/Pokemon';
import { Button, Card, CardBody, CardHeader, Image } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { SkeletonLoader } from '../../../components/skeletonLoader';

const PokemonList = () => {
    const navigate = useNavigate();
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    const getPokemonList = async () => {
        setLoading(true);
        const data = await fetchPokemonList();
        setPokemonList(data);
        setLoading(false);
    };

    const playCrie = (src:string) => {
        new Audio(src).play();
    };

    useEffect(() => {
        getPokemonList();
    }, []);

    return (
        <div>
            <Card className='w-2/3 mx-auto mt-10'>
                <CardHeader>
                    <div className='w-full grid grid-cols-7 gap-3'>
                        <span className='text-2xl font-bold col-span-6 text-center text-pink-600 ml-20'>
                            Lista Pokemons
                        </span>
                        <Button color='success' onPress={() => getPokemonList()}>
                            actualizar
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        loading ? (
                            <div className='flex flex-wrap justify-center gap-8'>
                                {
                                    Array.from({ length: 9 }).map((_) => (
                                        <SkeletonLoader />
                                    ))
                                }
                            </div>
                        ) :

                            (<div className='flex flex-wrap justify-center gap-8'>
                                {pokemonList.map((pokemon) => (
                                    <Card isPressable 
                                    className='p-2 w-1/4 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 hover:cursor-pointer hover:text-blue-400' 
                                    onPress={() => {playCrie(pokemon.cries.latest); navigate(`/pokemon/${pokemon.name}`)}}>
                                        <CardHeader>
                                            <span className='text-2xl font-bold ml-auto mr-auto capitalize'>
                                                {pokemon.name}
                                            </span>
                                        </CardHeader>
                                        <CardBody>
                                            <div className='flex justify-center'>
                                                <Image src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} isBlurred />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>)
                    }

                </CardBody>
            </Card>



        </div>
    );
};

export default PokemonList;

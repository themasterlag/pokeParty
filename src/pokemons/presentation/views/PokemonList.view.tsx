// src/presentation/components/PokemonList.tsx
import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../domain/usecases/pokemon.usecase';
import { Pokemon } from '../../domain/entities/Pokemon';
import { Button, Card, CardBody, CardHeader, Image, Listbox, ListboxItem } from '@heroui/react';
import { useNavigate } from 'react-router-dom';


const PokemonList = () => {
    const navigate = useNavigate();
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const getPokemonList = async () => {
            const data = await fetchPokemonList();
            setPokemonList(data);
        };
        getPokemonList();
    }, []);
    
    console.log("a",pokemonList[0]);

    return (
        <div>
            <Card className='w-3/4 m-auto h-5/6 mt-10'>
                <CardHeader>
                    <div className='w-full grid grid-cols-7 gap-3'>
                        <span className='text-2xl font-bold col-span-6 text-center text-pink-600 ml-20'>
                            Lista Pokemons
                        </span>
                        <Button color='success' onPress={() => navigate("/add")}>
                            New Pokémon
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className='flex flex-wrap justify-center gap-8'>
                        {pokemonList.map((pokemon) => (
                            <Card className='p-2 w-1/4 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 hover:cursor-pointer hover:text-blue-400'>
                                <CardHeader>
                                    <span className='text-2xl font-bold ml-auto mr-auto capitalize'>
                                        {pokemon.name}
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <div className='flex justify-center'>
                                        <Image src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} isBlurred/>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </CardBody>
            </Card>



        </div>
    );
};

export default PokemonList;

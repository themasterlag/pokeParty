import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchPokemon, editPokemon, removePokemon } from '../../domain/usecases/pokemon.usecase';
import { Pokemon } from '../../domain/entities/Pokemon';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getPokemon = async (name: string) => {
      if (id) {
        const data = await fetchPokemon(name);
        setPokemon(data);
        setName(data.name);
      }
    };

    getPokemon(location.pathname.split('/')[2] || '');
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pokemon) {
      const updatedPokemon = { ...pokemon, name };
      await editPokemon(updatedPokemon);
      navigate('/');
    }
  };

  const handleDelete = async () => {
    if (pokemon) {
    //   await removePokemon(pokemon.id);
      navigate('/');
    }
  };

  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle de {pokemon.name}</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default PokemonDetail;
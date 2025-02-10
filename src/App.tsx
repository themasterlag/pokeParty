
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonList from './pokemons/presentation/views/PokemonList.view'
import PokemonDetail from './pokemons/presentation/views/PokemonDetail.view'
import AddPokemon from './pokemons/presentation/views/Addpokemon.view'
import { HeroUIProvider } from '@heroui/system'

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/add" element={<AddPokemon />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  )
}

export default App

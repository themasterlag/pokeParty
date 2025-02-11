import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonList from './pokemons/ui.pokemonList.view'
import PokemonDetail from './pokemons/ui.pokemonDetail.view'
import { HeroUIProvider } from '@heroui/system'

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  )
}

export default App

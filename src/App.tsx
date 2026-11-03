import { useState } from 'react'
import Header from './components/header/header'
import './App.css'
import Banner from './components/banner/banner'
import Categoria from './components/categoria/categoria'
import Vitrine from './components/vitrine/vitrine'
import Parceiros from './components/parceiros/parceiros'
import Vitrine2 from './components/vitrine/vitrine2'
import Marcas from './components/marcas/marcas'
import Footer from './components/footer/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Header />
      <Banner />
      <Categoria />
      <Vitrine />
      <Parceiros />
      <Vitrine2 />
      <Parceiros />
      <Marcas />
      <Vitrine2 />
      <Footer />
    </main>
  )
}

export default App

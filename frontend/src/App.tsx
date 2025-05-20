import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/home/index'
import MovieDetail from './pages/movie_detail'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:idMovie' element={<MovieDetail/>}/>
      </Routes>
    </Router>
  )
}

export default App

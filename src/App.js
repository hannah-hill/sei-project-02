import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Flights from './components/Flights'
import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import Car from './components/Car'
import Footer from './components/Footer'
import Results from './components/Results'

function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <header className='App-header'>
            <div className='plane'></div>
            <Nav />
          </header>
          <div className='logo'></div>
          <main>
            <Route path='/flight' component={Flights} />
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/car' component={Car} />
            <Route path='/results' component={Results} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </>
  )
}

export default App

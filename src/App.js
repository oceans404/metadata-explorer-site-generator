import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from './mainPage';
import SingleNftView from './singleNftView';
import IdsPage from './IdsPage';
import TraitsPage from './TraitsPage';
import UniqueTraitsPage from './UniqueTraitsPage';
// import NewPage from './NewPage';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>📈 Top Ranked NFTs</Link>
            </li>
            <li>
              <Link to='/oneOf/1'>🥇 1 of 1 Traits</Link>
            </li>
            <li className='glitch'>
              <Link to='/trait'>👀 NFT by Trait</Link>
            </li>
            <li className='glitch'>
              <Link to='/id'>🔍 Find NFT by ID</Link>
            </li>
          </ul>
        </nav>

        <div className='page'>
          <Switch>
            <Route path='/oneOf/:n' component={UniqueTraitsPage} exact />
            <Route path='/id/:id' component={SingleNftView} />
            <Route path='/id' component={IdsPage} exact />
            <Route path='/trait/:trait/:val' component={MainPage} />
            <Route path='/trait' component={TraitsPage} exact />
            {/* <Route path='/omg'>
              <NewPage />
            </Route> */}
            <Route path='/'>
              <MainPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

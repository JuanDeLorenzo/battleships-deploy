import './App.css';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Landing from "./components/Landing";
import RandomMatchMaking from "./components/RandomMatchMaking";
import PreMatch from "./components/PreMatch";
import Match from "./components/Match";
import GameRoutes from "./components/GameRoutes";

function App() {
  return (
      <div className="App">
          <SignedOut>
              <Landing landingScreen></Landing>
          </SignedOut>

          <SignedIn>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <>
                      <Route element={<GameRoutes />}>
                          <Route path="/random-match-making" element={<RandomMatchMaking/>}/>
                          <Route path="/prematch" element={<PreMatch/>}/>
                          <Route path="/match" element={<Match/>}/>
                      </Route>
                  </>
              </Routes>
          </SignedIn>
      </div>
  );
}

export default App;

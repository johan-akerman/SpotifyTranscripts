import "./styles/tailwind.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Episode from "./pages/Episode";
import { useAuth } from "./hooks/useAuth";
import Discover from "./pages/Discover";

function App() {
  const token = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/discover"
          exact
          element={token ? <Discover /> : <Home />}
        />
        <Route path="/episode" exact element={token ? <Episode /> : <Home />} />
        <Route path="/episode" exact element={<Episode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

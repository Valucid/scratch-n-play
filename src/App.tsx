import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ScratchGame from './Pages/ScratchGame';
import Layout from './components/Layout';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/scratch-game" element={<ScratchGame />} />
      </Route>
      </Routes>
    </Router>
  );
};

export default App;

import {HashRouter as Router, Routes, Route} from 'react-router-dom'; 
import {Home, About, Projects} from './pages';
import Layout from './layout';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route index path="projects/*" element={<Projects />} />
            </Route>
          </Routes>
        </Router>
      </>
  );
}

export default App;
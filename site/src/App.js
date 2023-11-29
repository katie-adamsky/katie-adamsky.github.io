import {HashRouter as Router, Routes, Route} from 'react-router-dom'; 
import {Blog, About, Projects} from './pages';
import Layout from './layout';
import ScrollToTop from './layout/ScrollToTop';

function App() {
  return (
      <>
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<About />} />
              <Route path="blog/*" element={<Blog />} />
              <Route index path="projects/*" element={<Projects />} />
            </Route>
          </Routes>
        </Router>
      </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import ResultsPage from './ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Feedback from './components/Feedback';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedbackDashboard from './components/FeedbackDashboard';

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Feedback/>}/>
      <Route path='/dashboard' element={<FeedbackDashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

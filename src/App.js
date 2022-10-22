import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './components/SignUp'; 

function App() {
  
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />  
        </Routes>
        </BrowserRouter>
   
    </div>
  );
}

export default App;

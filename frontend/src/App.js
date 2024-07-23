import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainPage from "./pages/MainPage/MainPage";
import VerifyPage from './pages/VerifyPage/VerifyPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      {/* react-toastify ToastContainer, used to display toast messages */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        />
      <ToastContainer />
      
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/verify/:type/:token" element={<VerifyPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import AdvicesList from './components/AdvicesList';
import ProductsList from './components/ProductsList';
import AdviceDetails from './components/AdviceDetails';
import ProductDetails from './components/ProductDetails';
import EditAdvicePage from './components/EditAdvicePage';
import CreateAdvicePage from './components/CreateAdvicePage ';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar /> 
      </header>

      <Routes>
        <Route path='/' element={ <HomePage />}/>
        <Route path='/advices' element={ <AdvicesList />}></Route>
        <Route path='/products' element={ <ProductsList />}></Route>
        <Route path='/advices/create' element={ <CreateAdvicePage />}></Route>
        <Route path='/advices/:adviceId' element={ <AdviceDetails />} />
        <Route path='/products/:productId' element={ <ProductDetails />} />
        <Route path="/advices/edit/:adviceId" element={ <EditAdvicePage />} />

        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>

    </div>
  );
}

export default App;

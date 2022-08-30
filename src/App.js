import coinBack from './coinback.png';
import cointFront from './coinfront.png';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import '@progress/kendo-theme-default/dist/all.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import Management from './pages/management';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div className='img'>
          <img src={cointFront} className="Hazard-logo" alt="Saftey coin front" />
          <label className='headerText' htmlFor="coinBack">Hazard Elimination</label>
          <img src={coinBack} className="Hazard-logo" id="coinBack" alt="Saftey coin back" />
        </div>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </Router>       
    </div>      
  );
}

export default App;

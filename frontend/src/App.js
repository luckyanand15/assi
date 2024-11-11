import { Outlet } from 'react-router-dom'
import './App.css';
function App() {
  return (
    <div className="App">
      <p>Logo</p>
      <Outlet/> 
    </div>
  );
}

export default App;

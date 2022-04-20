import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import CustomerQueueView from './views/CustomerQueueView';
import CustomerControlView from './views/CounterControlView'
import MenuView from './views/MenuView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate replace to="/menu" />} />
          <Route path="/queue" element={<CustomerQueueView />} />
          <Route path="/control" element={<CustomerControlView />} />
          <Route path="/menu" element={<MenuView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

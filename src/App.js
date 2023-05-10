import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateForm from './CRUD/CreateForm';
import ListView from './CRUD/ListView';
import EditForm from './CRUD/EditForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/add' element={<CreateForm />} />
        <Route exact path='/edit' element={<EditForm />} />
        <Route exact path='/' element={<ListView />} />
      </Routes>
    </div>
  );
}

export default App;

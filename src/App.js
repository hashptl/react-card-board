import 'bootstrap/dist/css/bootstrap.min.css';
import  Home  from './views/Home';
import  StoreContext  from './context/store-context';

function App() {
  return (
    <StoreContext>
      <Home />
    </StoreContext>
  );
}

export default App;

import GlobalStyle from './styled/GlobalStyle';
import store from './redux/config/configStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}></Provider>
    </>
  );
}

export default App;

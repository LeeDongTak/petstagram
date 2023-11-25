import Router from './page/Router';
import GlobalStyle from './styled/GlobalStyle';
import store from './redux/config/configStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <GlobalStyle /> */}
        <Router />
      </Provider>
    </>
  );
}

export default App;

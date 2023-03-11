import { Provider } from 'react-redux';
import { store } from '@app-store';
import { Navigator } from '@pages';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;

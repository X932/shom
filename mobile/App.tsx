import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from '@app-store';
import { Navigator } from '@pages';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Navigator />
      <Toast topOffset={8} />
    </Provider>
  );
}

export default App;

import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from '@app-store';
import { Navigator } from '@pages';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigator />
        <Toast topOffset={8} />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

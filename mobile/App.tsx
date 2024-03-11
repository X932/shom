import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from '@app-store';
import { Navigator } from '@pages';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigator />
          <Toast topOffset={8} />
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;

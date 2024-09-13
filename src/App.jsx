import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';

const queryClinet = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;

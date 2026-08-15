import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './router/router';
import AuthProvider from './providers/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry once (default is 3)
      refetchOnWindowFocus: false, // Don't refetch on window focus
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A2E',
              color: '#F0F0F5',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
            },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;

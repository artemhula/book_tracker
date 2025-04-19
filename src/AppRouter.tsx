import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import type { Session } from '@supabase/auth-js';

export default function AppRouter({ session }: { session: Session | null }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <LibraryPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

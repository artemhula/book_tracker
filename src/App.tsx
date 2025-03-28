import { Route, Routes } from 'react-router';
import LibraryPage from './pages/LibraryPage';
import LoginRedirectPage from './pages/LoginRedirectPage';
import LoginPage from './pages/LoginPage';
import ProtectedLayout from './components/ProtectedLayout';
import StatsPage from './pages/StatsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<LibraryPage />} />
      </Route>
      <Route path="login">
        <Route index element={<LoginPage />} />
        <Route path="callback" element={<LoginRedirectPage />} />
      </Route>
      <Route path="stats" element={<ProtectedLayout />}>
        <Route index element={<StatsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import { Toaster } from 'sonner';
import './App.css';
import Modal from './components/Modal/Modal';
import Notifier from './components/Notifier';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/auth-js';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <header className="bg-white z-10">
        <h1 className="font-geist text-4xl font-bold py-6 mx-auto text-center ">
          Book Tracker
        </h1>
        <hr className="bg-gray-200 border-0 h-px" />
      </header>
      <main>
        {session ? <LibraryPage /> : <LoginPage />}
        <Toaster position="top-right" />
      </main>
      <Modal />
      <Notifier />
    </>
  );
}

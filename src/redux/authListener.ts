import { supabase } from '../supabaseClient';
import store from './store';
import { setSession } from './slices/authSlice';

export function initAuthListener() {
  supabase.auth.getSession().then(({ data: { session } }) => {
    store.dispatch(setSession(session));
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    store.dispatch(setSession(session));
  });
}

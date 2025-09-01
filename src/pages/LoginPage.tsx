import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  return (
    <div className="mt-50 mx-120 bg-gray-50 border-2 border-gray-100 flex gap-10 items-center justify-center rounded-lg">
      <div className="text-xl font-geist w-70 h-50 p-4">
        Book Tracker is a web application for readers that helps them
        conveniently manage their personal library and track their reading
        progress.
      </div>
      <div>
        <p className="font-geist text-xl">Please log in</p>
        <div className="w-50 rounded-2xl">
          <Auth
            supabaseClient={supabase}
            providers={['google']}
            onlyThirdPartyProviders
            redirectTo={window.location.origin}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  fonts: {
                    buttonFontFamily: 'Geist, Arial, sans-serif',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

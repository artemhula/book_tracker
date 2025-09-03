import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  return (
    <div className="bg-gray-50 mx-auto mt-40 border-2 border-gray-100 flex flex-col lg:flex-row gap-3 lg-gap-5 items-center justify-center rounded-lg p-4 lg:p-8 w-[300px] lg:w-[700px]">
      <div className="text-xl w-70 h-50 p-4">
        Book Tracker is a web application for readers that helps them
        conveniently manage their personal library and track their reading
        progress.
      </div>
      <div>
        <p className="text-xl text-center lg:text-start">Please log in</p>
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

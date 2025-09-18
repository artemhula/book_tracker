import Modal from '../components/Modal/Modal';
import Notifier from '../components/Notifier';

export default function LoginPage() {
  const handleSignInButton = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <>
      <header className="font-geist bg-white z-10 relative flex items-center justify-center">
        <h1 className="text-3xl lg:text-4xl font-bold py-6 text-center w-full">
          Book Tracker
        </h1>
        <hr className="bg-gray-200 border-0 h-px absolute bottom-0 left-0 w-full" />
      </header>

      <main className="font-geist">
        <div className="bg-gray-50 mx-auto mt-40 border-2 border-gray-100 flex flex-col lg:flex-row gap-3 lg-gap-5 items-center justify-center rounded-lg p-4 lg:p-8 w-[300px] lg:w-[700px]">
          <div className="text-xl w-70 h-50 p-4">
            Book Tracker is a web application for readers that helps them
            conveniently manage their personal library and track their reading
            progress.
          </div>

          <div className="md:flex md:flex-col md:items-center">
            <p className="text-xl text-center lg:text-start">Please log in</p>
            <div className="w-50 rounded-2xl flex justify-center">
              <button
                onClick={handleSignInButton}
                className="flex items-center justify-center gap-2 w-26 h-10 mt-2 bg-white cursor-pointer border-1 border-gray-200 hover:border-2 rounded-xl"
              >
                <img
                  src="https://static.cdnlogo.com/logos/g/38/google-icon.svg"
                  className="w-5"
                />
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
      <Modal />
      <Notifier />
    </>
  );
}

import { AnimatedBlobs } from '../components/AnimatedBlobs';
import { Header } from '../components/Header';

export const NotFoundPage = () => {
  return (
    <>
      <Header showUserBar={false} />
      <div className="font-geist min-h-[80vh] grid place-items-center text-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-2xl mt-6">Page Not Found</p>
        </div>
      </div>
      <AnimatedBlobs />
    </>
  );
};

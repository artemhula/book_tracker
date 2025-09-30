import { memo } from 'react';

export const AnimatedBlobs = memo(() => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div
          className="
            w-32 h-60 md:w-60 bg-gradient-to-r from-orange-300 to-red-300 rounded-full animate-blob blur-[100px] 
            md:blur-[140px] md:opacity-80
          "
        />
      </div>
    </>
  );
});

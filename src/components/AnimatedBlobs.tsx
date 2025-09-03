export default function AnimatedBlobs() {
  return (
    <>
      <div className="absolute top-0 -z-10 md:right-50  right-10 w-70 md:w-120 h-120 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -z-10 md:left-50 left-10 w-70 md:w-120 h-120 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    </>
  );
}

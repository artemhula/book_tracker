export default function AnimatedBlobs() {
  return (
    <>
      <div className="absolute top-0 -z-10 left-50 w-120 h-100 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -z-10 right-50 w-120 h-100 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 -z-10 left-110 w-100 h-100 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
    </>
  );
}

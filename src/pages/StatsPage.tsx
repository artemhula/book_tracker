import { BarChart } from '../components/Charts/BarChart';
import { Header } from '../components/Header';
import Notifier from '../components/Notifier';

export default function StatsPage() {
  return (
    <>
      <Header />

      <main className="font-geist">
        {/* <div className="container mx-auto relative w-full max-w-7xl">
          <AnimatedBlobs />
        </div> */}
        <BarChart />
      </main>

      <Notifier />
    </>
  );
}

import { TopBar } from "@/components/TopBar";
import Loader from "@/components/ui/Loader";

export default function Home() {
  // return <Loader />
  return (
    <div>
      <div className="w-full px-6 border-b-1">
        <TopBar />
      </div>
    </div>
  );
}

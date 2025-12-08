import { Features } from "@/components/main/features";
import { Hero } from "@/components/main/hero";
import { HotGames } from "@/components/main/HotGames";
import { Reviews } from "@/components/main/reviews";
import { Upcoming } from "@/components/main/upcoming";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="space-y-10">
        <HotGames />
        <Upcoming />
        <Features />
        <div className="pb-24">
          <Reviews />
        </div>
      </div>
    </div>
  );
}

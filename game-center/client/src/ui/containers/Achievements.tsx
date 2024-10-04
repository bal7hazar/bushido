import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/elements/sheet";
import { Button } from "@/ui/elements/button";
import { Badge } from "@/ui/elements/badge";
import { Game } from "@/dojo/models/game";
import { Award } from "lucide-react";
import { useAchievements } from "@/hooks/useAchievements";
import { RegisterAchievement } from "../actions/RegisterAchievement";
import { Achievement } from "@/dojo/models/achievement";
import { UpdateAchievement } from "../actions/UpdateAchievement";
import { useMemo } from "react";
import { Separator } from "@/ui/elements/separator";

const MAX_POINTS = 1000;

export const Achievements = ({ game }: { game: Game }) => {
  const { achievements } = useAchievements({ worldId: game.worldId, namespace: game.namespace });

  const totalPoints = useMemo(() => {
    return achievements.reduce((acc, achievement) => acc + achievement.points, 0);
  }, [achievements]);

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Button variant="outline" size="icon">
          <Award />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="text-3xl">Achievements</SheetTitle>
          <SheetDescription className="font-['Indie Flower'] text-xl">
            Manage your game's achievements
          </SheetDescription>
          <RegisterAchievement game={game} />
          {achievements.map((achievement) => (
            <Row key={achievement.id} achievement={achievement} />
          ))}
          <Separator />
          <div className="flex justify-between items-center gap-4">
            <p>Total points</p>
            <Badge variant="secondary" className="flex flex-col items-center justify-center text-xl">
              <span>{totalPoints}</span>
              <Separator className="bg-white" />
              <span>{MAX_POINTS}</span>
            </Badge>
          </div>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const Row = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div className="flex justify-between items-center gap-2 border border-slate-500 rounded-md p-2 bg-red-500">
      <div className="flex justify-between items-center grow">
        <p>{achievement.id}</p>
        <Badge variant="secondary" className="h-9 w-10 flex items-center justify-center text-xl">{achievement.points}</Badge>
      </div>
      <UpdateAchievement achievement={achievement} />
    </div>
  );
};
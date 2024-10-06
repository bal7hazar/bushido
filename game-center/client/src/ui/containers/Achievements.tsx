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
import { Award, SearchCheck, SearchX } from "lucide-react";
import { useAchievements } from "@/hooks/useAchievements";
import { RegisterAchievement } from "../actions/RegisterAchievement";
import { Achievement } from "@/dojo/models/achievement";
import { UpdateAchievement } from "../actions/UpdateAchievement";
import { useMemo } from "react";
import { Separator } from "@/ui/elements/separator";
import { Account, shortString } from "starknet";
import { PublishAchievement } from "../actions/PublishAchievement";
import { useDojo } from "@/dojo/useDojo";
import { useEvents } from "@/hooks/useEvents";

const MAX_POINTS = 1000;

export const Achievements = ({ game }: { game: Game }) => {
  const {
    account: { account },
  } = useDojo();

  const { achievements } = useAchievements({ worldId: game.worldId, namespace: shortString.encodeShortString(game.namespace) });
  const { creations, completions } = useEvents({ game, playerId: account?.address });

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
            <Row key={achievement.id} achievement={achievement} account={account} creations={creations} completions={completions} />
          ))}
          <Separator />
          <div className="flex justify-between items-center gap-4">
            <p>Total points</p>
            <Badge variant="secondary" className="flex flex-col items-center justify-center text-xl">
              <span>{totalPoints}</span>
              <Separator className="bg-slate-500" />
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

export const Row = ({ achievement, account, creations, completions }: { achievement: Achievement, account: Account, creations: any, completions: any }) => {
  const isFound = useMemo(() => {
    const achivementId = BigInt(shortString.encodeShortString(achievement.id));
    return creations.findIndex((creation: any) => creation.id === achivementId) !== -1;
  }, [achievement, creations]);

  return (
    <div className={`flex justify-between items-center gap-2 border rounded-md p-2 border-slate-500`}>
      <div className="flex justify-between items-center grow">
        <p>{achievement.id}</p>
        <Badge variant="secondary" className="h-9 w-9 flex items-center justify-center text-xl">{achievement.points}</Badge>
      </div>
      <Badge variant="secondary" className={`flex items-center justify-center min-h-9 min-w-9 ${isFound ? 'text-green-500' : 'text-red-500'}`}>
        {isFound ? <SearchCheck /> : <SearchX />}
      </Badge>
      <UpdateAchievement achievement={achievement} />
      <PublishAchievement />
    </div>
  );
};
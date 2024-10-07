import { useEvents } from "@/hooks/useEvents";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/elements/avatar";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/elements/card";
import { Progress } from "@/ui/elements/progress";
import { useInterfaceStore } from "@/store/selection";
import logo from "/assets/logo.png";
import { useDojo } from "@/dojo/useDojo";
import { useAchievements } from "@/hooks/useAchievements";
import { shortString } from "starknet";
import { AchievementCompletion, AchievementCreation } from "@/dojo/bindings/models.gen";
import { Achievement } from "@/dojo/models/achievement";
import { useMemo } from "react";

export const Player = () => {
  const { selection } = useInterfaceStore();
  const { account: { account }} = useDojo();
  const { achievements } = useAchievements({ worldId: selection.worldId, namespace: shortString.encodeShortString(selection.namespace) });
  const { creations, completions } = useEvents({ game: selection, playerId: account.address });

  if (!selection.worldId || !parseInt(selection.namespace, 16)) return null;

  return (
    <div className="mx-auto flex flex-col gap-4 items-center">
      <h1 className="font-['Indie Flower'] text-4xl">
        Player achievements
      </h1>
      <Avatar className="w-24 h-24">
          <AvatarImage src={selection.imageUri || logo} alt="game" />
          <AvatarFallback>GG</AvatarFallback>
      </Avatar>
      <div className="font-['Indie Flower'] text-xl">
        {selection.name}
      </div>
      <div className="flex gap-4" >
        {achievements.map((achievement) => (
          <PlayerAchievement key={achievement.id} achievement={achievement} creations={creations} completions={completions} />
        ))}
      </div>
    </div>
  );
};

export const PlayerAchievement = ({ achievement, creations, completions }: { achievement: Achievement, creations: AchievementCreation[], completions: AchievementCompletion[] }) => {
  const creation = useMemo(() => {
    const achievementId = BigInt(shortString.encodeShortString(achievement.id));
    return creations.find((creation) => creation.id === achievementId);
  }, [creations, achievement]);

  const progress = useMemo(() => {
    const achievementId = BigInt(shortString.encodeShortString(achievement.id));
    const filtered = completions.filter((completion) => completion.id === achievementId);
    const maxProgress = filtered.reduce((acc, completion) => acc + Number(completion.progress), 0);
    return maxProgress;
  }, [completions, achievement]);

  if (!creation) return null;
  
  return (
    <Card className={`w-[200px] ${progress === 100 ? 'border-green-500' : 'border-slate-500'}`}>
      <div className="flex flex-col justify-between h-full">
        <CardHeader>
          <CardTitle>{`${creation.title}`}</CardTitle>
          <CardDescription>{`${creation.description}`}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img className="w-16 h-16 rounded-full object-cover" src={`${creation.image_uri}`} alt={`${creation.title}`} />
          <p>{`${progress}%`}</p>
          <Progress value={progress} />
        </CardContent>
      </div>
    </Card>
  );
};


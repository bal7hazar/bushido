import { useDojo } from "@/dojo/useDojo";
import { useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/ui/elements/dialog";
import { Button } from "@/ui/elements/button";
import { Input } from "@/ui/elements/input";
import { shortString } from "starknet";
import { Save } from "lucide-react";
import { AchievementCreation } from "@/dojo/bindings/models.gen";
import { Game } from "@/dojo/models/game";

export const RegisterAchievement = ({ game, achievement }: { game: Game, achievement: AchievementCreation }) => {
  const [identifier, setIdentifier] = useState(shortString.decodeShortString(`0x${achievement.id.toString(16)}`.replace('0x0x', '0x')));
  const [points, setPoints] = useState(Number(achievement.points));
  const [isLoading, setIsLoading] = useState(false);

  const {
    account: { account },
    master,
    setup: {
      systemCalls: { registerAchievement },
    },
  } = useDojo();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      await registerAchievement({
        account: account,
        world_id: BigInt(game.worldId),
        namespace: shortString.encodeShortString(game.namespace),
        achievement_id: shortString.encodeShortString(identifier),
        points: points,
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    account,
    game,
    achievement,
    identifier,
    points,
  ]);

  const disabled = useMemo(() => {
    return !account || !master || account === master;
  }, [account, master]);

  if (disabled) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={disabled}>
          <Save />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register an achievement</DialogTitle>
          <DialogDescription>Provide the achievement data</DialogDescription>
        </DialogHeader>

        <Input
          className="w-full"
          placeholder="Unique Identifier"
          type="text"
          value={identifier}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
        />

        <Input
          className="w-full"
          placeholder="Points"
          type="number"
          value={points}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoints(parseInt(e.target.value))}
        />

        <DialogClose asChild>
          <Button
            disabled={!identifier}
            isLoading={isLoading}
            onClick={handleClick}
          >
            Register
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
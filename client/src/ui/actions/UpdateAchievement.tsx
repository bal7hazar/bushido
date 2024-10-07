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
import { Achievement } from "@/dojo/models/achievement";
import { Settings } from "lucide-react";

export const UpdateAchievement = ({ achievement }: { achievement: Achievement }) => {
  const [identifier, setIdentifier] = useState(achievement.id);
  const [points, setPoints] = useState(achievement.points);
  const [isLoading, setIsLoading] = useState(false);

  const {
    account: { account },
    master,
    setup: {
      systemCalls: { updateAchievement },
    },
  } = useDojo();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      await updateAchievement({
        account: account,
        world_id: BigInt(achievement.worldId),
        namespace: achievement.namespace,
        achievement_id: shortString.encodeShortString(achievement.id),
        points: points,
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    account,
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
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update an achievement</DialogTitle>
          <DialogDescription>Update the achievement data</DialogDescription>
        </DialogHeader>

        <Input
          className="w-full"
          placeholder="Unique Identifier"
          type="text"
          value={identifier}
          disabled={true}
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
            Save
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
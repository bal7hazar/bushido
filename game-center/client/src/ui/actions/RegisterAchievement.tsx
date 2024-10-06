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
import { Game } from "@/dojo/models/game";
import { shortString } from "starknet";

export const RegisterAchievement = ({ game }: { game: Game }) => {
  const [identifier, setIdentifier] = useState("");
  const [points, setPoints] = useState(0);
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
        <Button disabled={disabled}>New</Button>
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
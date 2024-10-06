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
import { Settings } from "lucide-react";
import { shortString } from "starknet";

export const UpdateGame = ({ game }: { game: Game}) => {
  const [worldId, setWorldId] = useState(game.worldId);
  const [namespace, setNamespace] = useState(game.namespace);
  const [name, setName] = useState(game.name);
  const [description, setDescription] = useState(game.description);
  const [toriiUrl, setToriiUrl] = useState(game.toriiUrl);
  const [imageUri, setImageUri] = useState(game.imageUri);
  const [isLoading, setIsLoading] = useState(false);


  const {
    account: { account },
    master,
    setup: {
      systemCalls: { updateGame },
    },
  } = useDojo();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      await updateGame({
        account: account,
        world_id: BigInt(worldId),
        namespace: shortString.encodeShortString(namespace),
        name: name,
        description: description,
        torii_url: toriiUrl,
        image_uri: imageUri,
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    account,
    worldId,
    namespace,
    name,
    description,
    toriiUrl,
    imageUri,
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
          <DialogTitle>Update a game</DialogTitle>
          <DialogDescription>Update the game data</DialogDescription>
        </DialogHeader>

        <Input
          className="w-full"
          placeholder="World address"
          type="text"
          value={worldId}
          disabled={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorldId(e.target.value)}
        />

        <Input
          className="w-full"
          placeholder="Namespace"
          type="text"
          value={namespace}
          disabled={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNamespace(e.target.value)}
        />

        <Input
          className="w-full"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />

        <Input
          className="w-full"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
        
        <Input
          className="w-full"
          placeholder="Image"
          type="text"
          value={imageUri}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUri(e.target.value)}
        />

        <Input
          className="w-full"
          placeholder="Torii URL"
          type="text"
          value={toriiUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToriiUrl(e.target.value)}
        />

        <DialogClose asChild>
          <Button
            disabled={!worldId || !namespace || !name || !description || !toriiUrl}
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
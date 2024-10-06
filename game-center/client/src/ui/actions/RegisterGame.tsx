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

export const RegisterGame = () => {
  const [worldId, setWorldId] = useState("");
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toriiUrl, setToriiUrl] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const {
    account: { account },
    master,
    setup: {
      systemCalls: { registerGame },
    },
  } = useDojo();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      await registerGame({
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
        <Button disabled={disabled}>Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register a game</DialogTitle>
          <DialogDescription>Provide the game data</DialogDescription>
        </DialogHeader>

        <Input
          className="w-full"
          placeholder="World address"
          type="text"
          value={worldId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorldId(e.target.value)}
        />

        <Input
          className="w-full"
          placeholder="Namespace"
          type="text"
          value={namespace}
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
            Register
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
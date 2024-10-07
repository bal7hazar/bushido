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
  DialogFooter,
} from "@/ui/elements/dialog";
import { Button } from "@/ui/elements/button";
import { Input } from "@/ui/elements/input";
import { Label } from "@/ui/elements/label";
import { shortString } from "starknet";

export const RegisterGame = () => {
  // const [worldId, setWorldId] = useState("");
  // const [namespace, setNamespace] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [toriiUrl, setToriiUrl] = useState("");
  // const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // FIXME: Test purposes, remove this
  const [worldId, setWorldId] = useState("0x684d1e701e054d931905a5dc2ebdf68eb5aab29d229cc22bee3859e85b4206c");
  const [namespace, setNamespace] = useState("conquest");
  const [name, setName] = useState("Conquest");
  const [description, setDescription] = useState("A game to conquer the world");
  const [toriiUrl, setToriiUrl] = useState("https://api.cartridge.gg/x/conquest/torii");
  const [imageUri, setImageUri] = useState("https://conquest-one.vercel.app/assets/logo.png");

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="world" className="text-right">World address</Label>
            <Input
              className="col-span-3"
              placeholder="World address"
              id="world"
              type="text"
              value={worldId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorldId(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="namespace" className="text-right">Namespace</Label>
            <Input
              className="col-span-3"
              placeholder="Namespace"
              id="namespace"
              type="text"
              value={namespace}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNamespace(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              className="col-span-3"
              placeholder="Name"
              id="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              className="col-span-3"
              placeholder="Description"
              id="description"
              type="text"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image</Label>
            <Input
              className="col-span-3"
              placeholder="Image"
              id="image"
              type="text"
              value={imageUri}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUri(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="torii" className="text-right">Torii URL</Label>
            <Input
              className="col-span-3"
              placeholder="Torii URL"
              id="torii"
              type="text"
              value={toriiUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToriiUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={!worldId || !namespace || !name || !description || !toriiUrl}
              isLoading={isLoading}
              onClick={handleClick}
            >
              Register
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
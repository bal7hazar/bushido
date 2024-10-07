import { useGames } from "@/hooks/useGames";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/elements/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/elements/avatar";
import { UpdateGame } from "../actions/UpdateGame";
import { RegisterGame } from "../actions/RegisterGame";
import { RegisterAchievement } from "../actions/RegisterAchievement";
import { Achievements } from "./Achievements";
import { shortString } from "starknet";
import { shortenHex } from "@dojoengine/utils";
import logo from "/assets/logo.png";
import { PublishGame } from "../actions/PublishGame";

export const Games = () => {
  const { games } = useGames();

  return (
    <div className="mx-auto flex flex-col gap-4 items-center">
      <RegisterGame />
      <Table>
        <TableCaption>Games</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.getId()}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={game.imageUri || logo} alt="game" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.description}</TableCell>
              <TableCell className="flex gap-2">
                <UpdateGame game={game} />
                <Achievements game={game} />
                <PublishGame />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
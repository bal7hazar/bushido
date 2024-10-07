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
import { Achievements } from "./Achievements";
import logo from "/assets/logo.png";
import { PublishGame } from "../actions/PublishGame";
import { useInterfaceStore } from "@/store/selection";
import { Game } from "@/dojo/models/game";
import { useMemo } from "react";
import { useAchievements } from "@/hooks/useAchievements";
import { useEvents } from "@/hooks/useEvents";
import { useDojo } from "@/dojo/useDojo";

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
            <GameRow key={game.getId()} game={game} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const GameRow = ({ game }: { game: Game }) => {
  const { selection, setSelection } = useInterfaceStore();

  const handleClick = (game: Game) => {
    setSelection(game);
  };

  const isSelected = useMemo(() => {
    return selection.worldId === game.worldId && selection.namespace === game.namespace;
  }, [selection, game]);
  
  return (
    <TableRow className={`${isSelected ? "opacity-100" : "opacity-50"}`} key={game.getId()} onClick={() => handleClick(game)}>
      <TableCell>
        <Avatar>
          <AvatarImage src={game.imageUri || logo} alt="game" />
          <AvatarFallback>GG</AvatarFallback>
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
  )
};

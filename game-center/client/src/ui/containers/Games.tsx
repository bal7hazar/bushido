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
import { UpdateGame } from "../actions/UpdateGame";
import { RegisterGame } from "../actions/RegisterGame";
import { useGame } from "@/hooks/useGame";

export const Games = () => {
  const { games } = useGames();

  return (
    <div className="mx-auto flex flex-col gap-4 items-center">
      <RegisterGame />
      <Table>
        <TableCaption>Games</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>World Address</TableHead>
            <TableHead>Namespace</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Torii URL</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.getId()}>
              <TableCell>{game.worldId}</TableCell>
              <TableCell>{game.namespace}</TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.description}</TableCell>
              <TableCell>{game.imageUri}</TableCell>
              <TableCell>{game.toriiUrl}</TableCell>
              <TableCell>
                <UpdateGame game={game} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
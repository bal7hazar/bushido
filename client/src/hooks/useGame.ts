import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";

export const useGame = ({ worldId, namespace }: { worldId: string | undefined, namespace: string | undefined }) => {
  const {
    setup: {
      clientModels: {
        Game,
        classes: { Game: GameClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(worldId || 0), BigInt(namespace || 0)]) as Entity,
    [worldId, namespace],
  );
  const component = useComponentValue(Game, key);
  const game = useMemo(() => {
    return component ? new GameClass(component) : null;
  }, [component]);
  return { game, key };
};

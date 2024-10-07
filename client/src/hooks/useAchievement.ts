import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";

export const useAchievement = ({ worldId, namespace, achievementId }: { worldId: string | undefined, namespace: string | undefined, achievementId: string | undefined }) => {
  const {
    setup: {
      clientModels: {
        Achievement,
        classes: { Achievement: AchievementClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(worldId || 0), BigInt(namespace || 0), BigInt(achievementId || 0)]) as Entity,
    [worldId, namespace],
  );
  const component = useComponentValue(Achievement, key);
  const achievement = useMemo(() => {
    return component ? new AchievementClass(component) : null;
  }, [component]);
  return { achievement, key };
};

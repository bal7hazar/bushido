import { useDojo } from "@/dojo/useDojo";
import { useEffect, useState } from "react";
import { useEntityQuery } from "@dojoengine/react";
import { Has, HasValue, getComponentValue } from "@dojoengine/recs";
import { Achievement } from "@/dojo/models/achievement";

export const useAchievements = ({ worldId, namespace }: { worldId: string | undefined, namespace: string | undefined }): { achievements: Achievement[] } => {
  const [achievements, setAchievements] = useState<any>({});

  const {
    setup: {
      clientModels: {
        Achievement,
        classes: { Achievement: AchievementClass },
      },
    },
  } = useDojo();

  const achievementKeys = useEntityQuery([Has(Achievement), HasValue(Achievement, { world_id: BigInt(worldId || 0), namespace: BigInt(namespace || 0) })]);

  useEffect(() => {
    const components = achievementKeys.map((entity) => {
      const component = getComponentValue(Achievement, entity);
      if (!component) {
        return undefined;
      }
      return new AchievementClass(component);
    });

    const objectified = components.reduce(
      (obj: any, achievement: Achievement | undefined) => {
        if (achievement) {
          obj[`${achievement.worldId}-${achievement.namespace}-${achievement.id}`] = achievement;
        }
        return obj;
      },
      {},
    );

    setAchievements(objectified);
  }, [achievementKeys]);

  return { achievements: Object.values(achievements) };
};

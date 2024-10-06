import { dojoConfig } from "../../dojo.config";
import * as torii from "@dojoengine/torii-client";
import { useDojo } from "../dojo/useDojo";
import { Component, ComponentUpdate, World, defineComponent, Type as RecsType } from "@dojoengine/recs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { defineComponentSystem } from "@dojoengine/recs";
import { AchievementCompletion, AchievementCreation } from "../dojo/bindings/models.gen";
import { Game } from "../dojo/models/game";
import { getSyncEvents } from "@dojoengine/state";


export function defineContractComponents(
  world: World, namespace: string
) {
  return {
      // Model definition for `bushido::events::index::AchievementCompletion` model
      AchievementCompletion: (() => {
          return defineComponent(
              world,
              {
                  world_id: RecsType.BigInt,
                  namespace: RecsType.BigInt,
                  id: RecsType.BigInt,
                  player_id: RecsType.BigInt,
                  progress: RecsType.Number,
                  time: RecsType.Number,
              },
              {
                  metadata: {
                      namespace,
                      name: "AchievementCompletion",
                      types: ["felt252", "felt252", "felt252", "felt252", "u8", "u64"],
                      customTypes: [],
                  },
              }
          );
      })(),

      // Model definition for `bushido::events::index::AchievementCreation` model
      AchievementCreation: (() => {
          return defineComponent(
              world,
              {
                  world_id: RecsType.BigInt,
                  namespace: RecsType.BigInt,
                  id: RecsType.BigInt,
                  points: RecsType.Number,
                  title: RecsType.String,
                  description: RecsType.String,
                  image_uri: RecsType.String,
                  time: RecsType.Number,
              },
              {
                  metadata: {
                      namespace,
                      name: "AchievementCreation",
                      types: ["felt252", "felt252", "felt252", "u16", "u64"],
                      customTypes: ["ByteArray", "ByteArray", "ByteArray"],
                  },
              }
          );
      })(),
  };
}

export const useEvents = ({ game, playerId }: { game: Game, playerId: string | undefined }): { creations: AchievementCreation[], completions: AchievementCompletion[] } => {
  const [creations, setCreations] = useState<any>({});
  const [completions, setCompletions] = useState<any>({});
  const [toriiClient, setToriiClient] = useState<torii.ToriiClient | null>(null);

  const { setup: { world, }, } = useDojo();

  const setupToriiClient = useCallback(async () => {
    if (!game) return;
    const config = dojoConfig();
    const client = await torii.createClient({
      rpcUrl: config.rpcUrl, // FIXME: Not required?
      toriiUrl: game.toriiUrl,
      relayUrl: "",
      worldAddress: game.worldId|| "",
    });
    setToriiClient(client);
  }, [dojoConfig, game]);

  useEffect(() => {
    setupToriiClient();
  }, [setupToriiClient]);

  const contractModels = useMemo(() => {
    if (!game) return;
    return defineContractComponents(world, game.namespace);
  }, [world, game]);

  const _ = useMemo(async () => {
    if (!toriiClient || !contractModels) return;
    return await getSyncEvents(
      toriiClient,
      contractModels as any,
      undefined,
      [],
    );
  }, [toriiClient, contractModels]);

  const handleAchievementCreation = useCallback((update: ComponentUpdate) => {
    setCreations((prev: any) => ({ ...prev, [update.value[0]?.id]: update.value[0] }));
  }, []);

  const handleAchievementCompletion = useCallback((update: ComponentUpdate) => {
    if (update.value[0]?.player_id !== BigInt(playerId || 0)) return;
    setCompletions((prev: any) => ({ ...prev, [update.value[0]?.id]: update.value[0] }));
  }, [playerId]);

  const createEventStream = useCallback((
    world: World,
    component: Component<any>,
    handler: (update: ComponentUpdate) => void
  ) => {
    defineComponentSystem(
      world,
      component,
      (update: ComponentUpdate) => {
        handler(update);
      },
      { runOnInit: false }
    );
  }, []);

  useEffect(() => {
    if (!contractModels) return;
    const { AchievementCreation, AchievementCompletion } = contractModels;
    createEventStream(world, AchievementCreation, handleAchievementCreation);
    createEventStream(world, AchievementCompletion, handleAchievementCompletion);
  }, [world, contractModels, createEventStream, handleAchievementCreation, handleAchievementCompletion]);

  return {
    creations: Object.values(creations),
    completions: Object.values(completions)
  };
};
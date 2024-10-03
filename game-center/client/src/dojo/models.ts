import { ContractComponents } from "./bindings/models.gen";
import { overridableComponent } from "@dojoengine/recs";
import { Game } from "./models/game";
import { Achievement } from "./models/achievement";

export type ClientModels = ReturnType<typeof models>;

export function models({
  contractModels,
}: {
  contractModels: ContractComponents;
}) {
  return {
    ...contractModels,
    classes: {
      Game,
      Achievement,
    },
  };
}

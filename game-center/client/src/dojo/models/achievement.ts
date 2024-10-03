import { ComponentValue } from "@dojoengine/recs";
import { shortString } from "starknet";

export class Achievement {
  public worldId: string;
  public namespace: string;
  public id: string;
  public points: number;
  public whitelisted: boolean;

  constructor(component: ComponentValue) {
    this.worldId = `0x${component.world_id.toString(16)}`.replace("0x0x", "0x");
    this.namespace = `0x${component.namespace.toString(16)}`.replace("0x0x", "0x");
    this.id = shortString.decodeShortString(component.id);
    this.points = component.points;
    this.whitelisted = component.whitelisted;
  }
}

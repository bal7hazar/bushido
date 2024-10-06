import { ComponentValue } from "@dojoengine/recs";
import { shortString } from "starknet";

export class Game {
  public worldId: string;
  public namespace: string;
  public totalPoints: number;
  public name: string;
  public description: string;
  public whitelisted: boolean;
  public toriiUrl: string;
  public imageUri: string;

  constructor(component: ComponentValue) {
    this.worldId = `0x${component.world_id.toString(16)}`.replace("0x0x", "0x");
    this.namespace = shortString.decodeShortString(`0x${component.namespace.toString(16)}`.replace("0x0x", "0x"));
    this.totalPoints = component.total_points;
    this.name = component.name;
    this.description = component.description;
    this.whitelisted = component.whitelisted;
    this.toriiUrl = component.torii_url;
    this.imageUri = component.image_uri;
  }

  getId(): string {
    return `${this.worldId}-${this.namespace}`;
  }
}

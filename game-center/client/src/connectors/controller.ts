import { Connector } from "@starknet-react/core";
import CartridgeConnector from "@cartridge/connector";
import { getContractByName } from "@dojoengine/core";
import { dojoConfig } from "../../dojo.config";

export const controller = (): { connectors: Connector[] } => {
  const namespace: string = "game_center";

  const config = dojoConfig();
  const actions = getContractByName(config.manifest, namespace, "Actions")?.address;
  const paymaster = { caller: "0x414e595f43414c4c4552" };
  const rpc = import.meta.env.VITE_PUBLIC_NODE_URL;
  const policies = [
    {
      target: actions,
      method: "register_game",
    },
    {
      target: actions,
      method: "update_game",
    },
    {
      target: actions,
      method: "register_achievement",
    },
    {
      target: actions,
      method: "update_achievement",
    },
  ];

  const cartridge = new CartridgeConnector({
    rpc,
    policies,
    paymaster,
  }) as never as Connector;

  return { connectors: [cartridge] };
};
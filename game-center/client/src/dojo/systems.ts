import type { IWorld } from "./bindings/contracts.gen";
import { toast } from "sonner";
import * as SystemTypes from "./bindings/contracts.gen";
import { ClientModels } from "./models";
import { shortenHex } from "@dojoengine/utils";
import { Account } from "starknet";
import { World } from "@dojoengine/recs";

export type SystemCalls = ReturnType<typeof systems>;

export function systems({
  client,
  clientModels,
}: {
  client: IWorld;
  clientModels: ClientModels;
}) {
  const TOAST_ID = "unique-id";

  const extractedMessage = (message: string) => {
    return message.match(/\('([^']+)'\)/)?.[1];
  };

  const getToastAction = (transaction_hash: string) => {
    return {
      label: "View",
      onClick: () =>
        window.open(
          `https://worlds.dev/networks/slot/worlds/game-center/txs/${transaction_hash}`,
        ),
    };
  };

  const getToastPlacement = ():
    | "top-center"
    | "bottom-center"
    | "bottom-right" => {
    return "bottom-right";
  };

  const toastPlacement = getToastPlacement();

  const notify = (message: string, transaction: any) => {
    if (transaction.execution_status !== "REVERTED") {
      toast.success(message, {
        id: TOAST_ID,
        description: shortenHex(transaction.transaction_hash),
        action: getToastAction(transaction.transaction_hash),
        position: toastPlacement,
      });
    } else {
      toast.error(extractedMessage(transaction.revert_reason), {
        id: TOAST_ID,
        position: toastPlacement,
      });
    }
  };

  const handleTransaction = async (
    account: Account,
    action: () => Promise<{ transaction_hash: string }>,
    successMessage: string,
  ) => {
    toast.loading("Transaction in progress...", {
      id: TOAST_ID,
      position: toastPlacement,
    });
    try {
      const { transaction_hash } = await action();
      toast.loading("Transaction in progress...", {
        description: shortenHex(transaction_hash),
        action: getToastAction(transaction_hash),
        id: TOAST_ID,
        position: toastPlacement,
      });

      const transaction = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      notify(successMessage, transaction);
    } catch (error: any) {
      toast.error(extractedMessage(error.message), { id: TOAST_ID });
    }
  };

  const registerGame = async ({ account, ...props }: SystemTypes.RegisterGame) => {
    await handleTransaction(
      account,
      () => client.Actions.register_game({ account, ...props }),
      "Game has been registered.",
    );
  };

  const updateGame = async ({ account, ...props }: SystemTypes.UpdateGame) => {
    await handleTransaction(
      account,
      () => client.Actions.update_game({ account, ...props }),
      "Game has been updated.",
    );
  };
  
  const registerAchievement = async ({ account, ...props }: SystemTypes.RegisterAchievement) => {
    await handleTransaction(
      account,
      () => client.Actions.register_achievement({ account, ...props }),
      "Achievement has been registered.",
    );
  };

  const updateAchievement = async ({ account, ...props }: SystemTypes.UpdateAchievement) => {
    await handleTransaction(
      account,
      () => client.Actions.update_achievement({ account, ...props }),
      "Achievement has been updated.",
    );
  };

  return {
    registerGame,
    updateGame,
    registerAchievement,
    updateAchievement,
  };
}

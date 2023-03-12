import { TonConnectUI, useTonConnectUI } from '@tonconnect/ui-react';
import { Address, Sender, SenderArguments } from 'ton-core';

export function createSender(tonConnectUI: TonConnectUI) {
  let address = undefined;
  if (tonConnectUI?.account) {
    address = Address.parse(tonConnectUI.account.address);
  }
  return {
    address,
    send: async (args: SenderArguments) => {
      await tonConnectUI.sendTransaction({
        messages: [
          {
            address: args.to.toString(),
            amount: args.value.toString(),
            payload: args.body?.toBoc().toString('base64'),
          },
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
      });
    },
  };
}

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  return {
    sender: createSender(tonConnectUI),
    connected: tonConnectUI?.connected,
  };
}
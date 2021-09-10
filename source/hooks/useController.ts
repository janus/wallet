import { EarthKeyringPair } from '@earthwallet/keyring';
import { browser } from 'webextension-polyfill-ts';

export function useController() {
  return browser.extension.getBackgroundPage().controller;
}

export function useFetchAssetPrice() {
  const controller = useController();

  return controller.assets.fetchFiatPrice();
}

export function useNewMnemonic() {
  const controller = useController();

  return controller.accounts.createNewMnemonic();
}

export function useCurrentDapp() {
  const controller = useController();

  return controller.dapp.getCurrent();
}

export function useConnectWalletToDApp() {
  const controller = useController();
  const current = controller.dapp.getCurrent();
  const origin = current && current.origin;
  console.log('useConnectWalletToDApp');
  return async () => {
    controller.dapp.fromUserConnectDApp(origin, current);
    const background = await browser.runtime.getBackgroundPage();

    background.dispatchEvent(
      new CustomEvent('connectWallet', { detail: window.location.hash })
    );
  };
}

export function useUpdateActiveAccount(
  account: EarthKeyringPair & { id: string }
) {
  const controller = useController();
  console.log('useUpdateActiveAccount', account);
  return async () => {
    controller.dapp.setActiveAccount(account);
    const background = await browser.runtime.getBackgroundPage();

    background.dispatchEvent(
      new CustomEvent('setActiveAccount', { detail: window.location.hash })
    );
  };
}

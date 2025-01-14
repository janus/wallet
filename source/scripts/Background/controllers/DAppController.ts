import { ConnectedDApps, DAppInfo } from '~global/types';
import { listNewDapp } from '~state/dapp';
import store from '~state/store';
import { IDAppController, SignatureRequest } from '../types/IDAppController';

class DAppController implements IDAppController {
  #current: DAppInfo = { origin: '', logo: '', title: '' };
  #request: SignatureRequest;

  fromPageConnectDApp(origin: string, title: string) {
    const dapp: ConnectedDApps = store.getState().dapp;

    this.#current = {
      origin,
      logo: `chrome://favicon/size/64@1x/${origin}`,
      title,
    };

    return !!dapp[origin];
  }

  fromUserConnectDApp(origin: string, dapp: DAppInfo) {
    store.dispatch(listNewDapp({ id: origin, dapp }));
  }

  getCurrent() {
    return this.#current;
  }

  setSignatureRequest(req: SignatureRequest) {
    this.#request = req;
  }

  getSignatureRequest = () => {
    return this.#request;
  };
}

export default DAppController;

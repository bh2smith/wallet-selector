import type {
  ModuleState,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import { renderModal } from "./render-modal";
import type {
  WalletSelectorModal,
  ModalOptions,
  ModalRoute,
} from "./modal.types";
import { renderWalletOptions } from "./components/WalletOptions";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let modalInstance: WalletSelectorModal | null = null;

type ModalState = {
  container: HTMLElement;
  selector: WalletSelector;
  options: ModalOptions;
  route: ModalRoute;
  modules: Array<ModuleState<Wallet>>;
};

export let modalState: ModalState | null = null;

export function updateModalState(newModalState: ModalState) {
  modalState = newModalState;
}

const el = document.createElement("div");
el.id = MODAL_ELEMENT_ID;
document.body.appendChild(el);

export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  modalState = {
    container: document.getElementById(MODAL_ELEMENT_ID)!,
    selector,
    options,
    route: {
      name: "WalletOptions",
    },
    modules: [],
  };

  modalState.selector.store.observable.subscribe((state) => {
    if (!modalState) {
      return;
    }

    state.modules.sort((current, next) => {
      if (current.metadata.deprecated === next.metadata.deprecated) {
        return 0;
      }

      return current.metadata.deprecated ? 1 : -1;
    });

    modalState.modules = state.modules;
  });

  renderModal();

  if (!modalInstance) {
    modalInstance = {
      show: () => {
        if (!modalState) {
          return;
        }
        renderWalletOptions();
        modalState.container.children[0].classList.add("open");
      },
      hide: () => {
        if (!modalState) {
          return;
        }
        modalState.container.children[0].classList.remove("open");
      },
    };
  }

  return modalInstance;
};

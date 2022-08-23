import { modalState } from "../modal";

export function renderConnectHardwareWallet() {
  if (!modalState) {
    return;
  }

  document.querySelector(".modal-body")!.innerHTML = `
    <div class="derivation-path-wrapper">
      <div class="enter-derivation-path">
        <div>
          <p>Make sure your device is plugged in, then enter a derivation path to connect:</p><input type="text"
            placeholder="Derivation Path" value="44'/397'/0'/0'/1'">
        </div>
        <div class="action-buttons"><button class="left-button">Back</button><button class="right-button">Continue</button>
        </div>
      </div>
    </div>
  `;
}

import {
  createContext,
  createSignal,
  JSX,
  useContext,
  Accessor,
  Setter,
  Show,
} from "solid-js";

interface ErrorModalContextType {
  errorMessage: Accessor<string | null>;
  setErrorMessage: Setter<string | null>;
}

export const ErrorModalContext = createContext<ErrorModalContextType>();

export const ErrorModalProvider = (props: { children: JSX.Element }) => {
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);
  const errorMessageHandler: ErrorModalContextType = {
    errorMessage,
    setErrorMessage,
  };

  return (
    <ErrorModalContext.Provider value={errorMessageHandler}>
      {props.children}
      <ErrorModal />
    </ErrorModalContext.Provider>
  );
};

export const ErrorModal = () => {
  const context = useContext(ErrorModalContext);
  const closeModal = () => context?.setErrorMessage(null);

  return (
    <Show when={context?.errorMessage()}>
      {(errorMessage) => (
        <dialog class="modal modal-open">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Error</h3>
            <p class="py-4">{errorMessage()}</p>
            <div class="modal-action">
              <button class="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop" onClick={closeModal}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </Show>
  );
};

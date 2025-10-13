import { createSignal, Show, useContext } from "solid-js";
import { Button } from "@components/Button";
import { ErrorModalContext } from "@context/ErrorModal";
import { toDataURL } from "qrcode";
import qrCodeIcon from "./qrcode.svg";

export interface Props {
  filename: string;
  link: string;
}

export const QrCodeButton = (props: Props) => {
  const errorContext = useContext(ErrorModalContext);
  const [qrCode, setQrCode] = createSignal<string | null>(null);

  const openQrCode = async () => {
    try {
      const qrCodeDataUrl = await toDataURL(props.link);
      setQrCode(qrCodeDataUrl);
    } catch (error: unknown) {
      errorContext?.setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate QR code"
      );
    }
  };

  const handleDownload = () => {
    const qrCodeUrl = qrCode();
    if (!qrCodeUrl) return;

    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.href = qrCodeUrl;
    downloadLink.download = `${props.filename}-qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <div class="btn btn-circle btn-sm btn-outline" onClick={openQrCode}>
        <img class="w-4 h-4" src={qrCodeIcon} alt="qr-code" />
      </div>
      <Show when={qrCode()}>
        {(qrCode) => (
          <dialog class="modal modal-open">
            <div class="modal-box w-60 flex flex-col items-center justify-center">
              <Button
                class="btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setQrCode(null)}
              >
                ✕
              </Button>
              <div class="p-4">
                <img src={qrCode()} alt="qr-code" />
              </div>
              <Button class="btn-outline" onClick={handleDownload}>
                Download
              </Button>
            </div>
            <form
              method="dialog"
              class="modal-backdrop"
              onClick={() => setQrCode(null)}
            />
          </dialog>
        )}
      </Show>
    </>
  );
};

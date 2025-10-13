import qrCodeIcon from "./qrcode.svg";

export const QrCodeButton = () => {
  return (
    <div class="btn btn-circle btn-sm btn-outline">
      <img class="w-4 h-4" src={qrCodeIcon} alt="qr-code" />
    </div>
  );
};

import { GuestInfoView } from "wedding-interface";

interface Props {
  list: Array<GuestInfoView>;
  onAddGuest: () => void;
}

export const Infomations = (props: Props) => {
  let totalBrideEstimatedCount = 0;
  let totalBrideConfirmedCount = 0;
  let totalGroomEstimatedCount = 0;
  let totalGroomConfirmedCount = 0;

  props.list.forEach((guest) => {
    if (guest.side === "BRIDE") {
      totalBrideEstimatedCount += guest.estimatedCount;
      totalBrideConfirmedCount += guest.confirmedCount || 0;
    } else {
      totalGroomEstimatedCount += guest.estimatedCount;
      totalGroomConfirmedCount += guest.confirmedCount || 0;
    }
  });

  return (
    <div class="flex justify-between my-4 w-full">
      <div>
        <p>
          Total Estimated Count:{" "}
          {totalBrideEstimatedCount + totalGroomEstimatedCount}(
          <span class="text-red-400">{totalBrideEstimatedCount}</span> /{" "}
          <span class="text-blue-400">{totalGroomEstimatedCount}</span>)
        </p>
        <p>
          Total Confirmed Count:{" "}
          {totalBrideConfirmedCount + totalGroomConfirmedCount}(
          <span class="text-red-400">{totalBrideConfirmedCount}</span> /{" "}
          <span class="text-blue-400">{totalGroomConfirmedCount}</span>)
        </p>
      </div>
      <button
        class="btn btn-accent btn-sm rounded-md self-end"
        onClick={props.onAddGuest}
      >
        Add Guest
      </button>
    </div>
  );
};

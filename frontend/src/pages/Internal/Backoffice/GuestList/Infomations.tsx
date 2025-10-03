import { GuestInfoView } from "wedding-interface";

interface Props {
  list: Array<GuestInfoView>;
}

export const Infomations = (props: Props) => {
  let totalEstimatedCount = 0;
  let totalConfirmedCount = 0;

  props.list.forEach((guest) => {
    totalEstimatedCount += guest.estimatedCount;
    totalConfirmedCount += guest.confirmedCount || 0;
  });

  return (
    <div class="flex justify-between my-4 w-full">
      <div>
        <p>Total Estimated Count: {totalEstimatedCount}</p>
        <p>Total Confirmed Count: {totalConfirmedCount}</p>
      </div>
      <button class="btn btn-accent btn-sm rounded-md self-end">
        Add Guest
      </button>
    </div>
  );
};

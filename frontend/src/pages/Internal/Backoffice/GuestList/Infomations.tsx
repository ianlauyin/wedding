interface Props {
  totalEstimatedCount: number;
  totalConfirmedCount: number;
}

export const Infomations = (props: Props) => {
  return (
    <div class="flex justify-between my-4 w-full">
      <div>
        <p>Total Estimated Count: {props.totalEstimatedCount}</p>
        <p>Total Confirmed Count: {props.totalConfirmedCount}</p>
      </div>
      <button class="btn btn-accent btn-sm rounded-md self-end">
        Add Guest
      </button>
    </div>
  );
};

import { Button } from "@components/Button";

interface Props {
  onAddButtonClick: () => void;
  refetch: () => void;
}

export const ActionPanel = (props: Props) => {
  return (
    <div class="flex justify-end gap-4 w-full">
      <Button class="btn-sm btn-info rounded-md" onClick={props.refetch}>
        Refresh
      </Button>
      <Button
        class="btn-sm btn-accent rounded-md"
        onClick={props.onAddButtonClick}
      >
        Add Guest
      </Button>
    </div>
  );
};

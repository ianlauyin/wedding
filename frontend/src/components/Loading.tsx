export interface Props {
  class?: string;
}

export const Loading = (props: Props) => {
  return (
    <div class={`h-full flex justify-center ${props.class}`}>
      <span class="loading loading-xl text-accent" />
    </div>
  );
};

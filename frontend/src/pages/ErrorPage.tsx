export interface Props {
  message: string;
}

export const ErrorPage = (props: Props) => {
  return (
    <div class="card card-lg justify-self-center">
      <div class="card-body">
        <h1 class="card-title text-4xl font-bold">Oops!</h1>
        <h2 class="text-2xl font-bold">Something went wrong :(</h2>
        <p>Error: {props.message}</p>
        <p>Please contact Ian/Claire if we sent you here</p>
      </div>
    </div>
  );
};

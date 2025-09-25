export interface Props {
  message: string;
}

export const ErrorComponent = ({ message }: Props) => {
  return (
    <div>
      <h1>Oops!</h1>
      <h2>Something went wrong :(</h2>
      <p>Error: {message}</p>
      <p>Please contact Ian/Claire if we sent you here</p>
    </div>
  );
};

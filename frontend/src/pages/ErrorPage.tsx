export interface Props {
  message: string;
}

export const ErrorPage = ({ message }: Props) => {
  return (
    <div>
      <h4>Oops!</h4>
      <h5>Something went wrong :(</h5>
      <p>Error: {message}</p>
      <p>Please contact Ian/Claire if we sent you here</p>
    </div>
  );
};

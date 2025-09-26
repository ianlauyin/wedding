import "./index.css";

export interface Props {
  message: string;
}

export const ErrorPage = ({ message }: Props) => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <h2>Something went wrong :(</h2>
      <p>Error: {message}</p>
      <p>Please contact Ian/Claire if we sent you here</p>
    </div>
  );
};

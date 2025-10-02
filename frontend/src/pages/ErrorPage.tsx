import { Flex } from "~/solidui/components/flex";

export interface Props {
  message: string;
}

export const ErrorPage = ({ message }: Props) => {
  return (
    <Flex
      flexDirection="col"
      justifyContent="center"
      alignItems="center"
      class="h-full w-full space-y-4"
    >
      <h1 class="text-5xl font-bold">Oops!</h1>
      <h2 class="text-3xl font-bold">Something went wrong :(</h2>
      <div>
        <p>Error: {message}</p>
        <p>Please contact Ian/Claire if we sent you here</p>
      </div>
    </Flex>
  );
};

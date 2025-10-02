import { Flex } from "~/solidui/components/flex";

export const Loading = () => {
  return (
    <Flex justifyContent="center" alignItems="center" class="h-full w-full">
      <div class="w-12 h-12 border-4 rounded-full animate-spin border-t-gray-400"></div>
    </Flex>
  );
};

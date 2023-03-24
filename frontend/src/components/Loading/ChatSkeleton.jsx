import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
function ChatSkeleton() {
  return (
    <div>
      <Box padding="6" boxShadow="lg" bg="white" borderRadius={"lg"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={12} spacing="4" skeletonHeight="7" />
      </Box>
    </div>
  );
}
export default ChatSkeleton;

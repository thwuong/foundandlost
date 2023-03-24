import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
function PostSkeleton() {
  return (
    <div className="py-8 grid xl:grid-cols-2 gap-5">
      <Box padding="6" boxShadow="lg" bg="white" borderRadius={"lg"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white" borderRadius={"lg"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white" borderRadius={"lg"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white" borderRadius={"lg"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    </div>
  );
}
export default PostSkeleton;

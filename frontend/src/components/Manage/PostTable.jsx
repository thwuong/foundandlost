import React, { useEffect, useState } from "react";
import {
  Tbody,
  Tr,
  Td,
  Table,
  Thead,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import PostRow from "./PostRow";
import ManageSkeleton from "../Loading/ManageSkeleton";

import { deleteItem } from "../../api/postAPI";
import { useLoading } from "../../customHooks/useLoading";
function PostTable() {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const loading = useLoading();
  const handleRemove = async (status, postId) => {
    if (status) {
      await deleteItem(dispatch, postId);
    }
  };

  return (
    <>
      <TableContainer overflowX="unset" overflowY="unset">
        {loading ? (
          <ManageSkeleton />
        ) : (
          <Table>
            <Thead position={"sticky"} top={0} zIndex="docked" bg={"white"}>
              <Tr>
                <Th>Loại đồ vật</Th>
                <Th>Người đăng</Th>
                <Th>Trạng thái</Th>
                <Th>Ngày đăng</Th>
                <Th>Địa điểm</Th>
                <Th>Tùy chọn</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts && posts.length > 0
                ? posts.map((post) => {
                    return (
                      <PostRow
                        key={post.id}
                        post={post}
                        handleRemove={handleRemove}
                      />
                    );
                  })
                : null}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

export default PostTable;

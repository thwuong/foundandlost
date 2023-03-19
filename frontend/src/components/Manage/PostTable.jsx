import React, { useState } from "react";
import {
  Badge,
  Tbody,
  Tr,
  Td,
  Table,
  Thead,
  Th,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
import {
  renderTypePost,
  renderStatusPost,
} from "../../utils/renderColorStatus";
import { deleteItem } from "../../api/postAPI";
function PostTable(props) {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState();
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVefiryModal,
  } = useDisclosure();
  const handleRemove = async (status) => {
    if (status) {
      // await deleteItem(dispatch, selectedPost);
    }
  };
  return (
    <>
      <TableContainer overflowX="unset" overflowY="unset">
        <Table>
          <Thead position={"sticky"} top={0} zIndex="docked" bg={"white"}>
            <Tr>
              <Th>Loại đồ vật</Th>
              <Th>Người đăng</Th>
              <Th>Trạng thái</Th>
              <Th>
                <span>Ngày đăng</span>
              </Th>
              <Th>Địa điểm</Th>
              <Th>Tùy chọn</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts && posts.length > 0
              ? posts.map((post) => {
                  return (
                    <Tr key={post.id}>
                      <Td>
                        <Badge
                          variant="outline"
                          colorScheme={renderTypePost(post.postType)}
                        >
                          {post.postType}
                        </Badge>
                      </Td>
                      <Td>
                        <div className="flex gap-1 items-center">
                          <img
                            src={post.author.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">
                              {post.author.fullName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {post.author.email}
                            </p>
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <Badge
                          variant="solid"
                          colorScheme={renderStatusPost(post.status)}
                        >
                          {post.status}
                        </Badge>
                      </Td>
                      <Td>{moment(post.createdAt).fromNow()}</Td>
                      <Td>{post.location}</Td>

                      <Td>
                        <ul className=" flex items-center gap-2">
                          <li className="cursor-pointer">
                            <box-icon name="show" color="#7286D3"></box-icon>
                          </li>
                          {post.status === "comfirmed" ? (
                            <li
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedPost(post.id);
                                onOpenVerifyModal();
                              }}
                            >
                              <box-icon name="trash" color="#7286D3"></box-icon>
                            </li>
                          ) : null}
                        </ul>
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      <InstanceModal
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Chắc chắn xóa đồ vật này!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default PostTable;

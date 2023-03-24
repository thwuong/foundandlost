import React from "react";
import { Badge, Tr, Td, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
import {
  renderTypePost,
  renderStatusPost,
} from "../../utils/renderColorStatus";
function PostRow(props) {
  const { post, handleRemove } = props;
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVerifyModal,
  } = useDisclosure();
  return (
    <Tr>
      <Td>
        <Badge variant="outline" colorScheme={renderTypePost(post.postType)}>
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
            <p className="font-semibold">{post.author.fullName}</p>
            <p className="text-sm text-gray-500">{post.author.email}</p>
          </div>
        </div>
      </Td>
      <Td>
        <Badge variant="solid" colorScheme={renderStatusPost(post.status)}>
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
            <li className="cursor-pointer" onClick={onOpenVerifyModal}>
              <box-icon name="trash" color="#7286D3"></box-icon>
            </li>
          ) : null}
        </ul>
        <InstanceModal
          show={isOpenVerifyModal}
          modalName={"Xác nhận"}
          hide={onCloseVerifyModal}
          content={
            <VerifyModal
              hide={onCloseVerifyModal}
              title={"Xóa đồ vật này!"}
              handleVerify={handleRemove}
            />
          }
        />
      </Td>
    </Tr>
  );
}

export default PostRow;

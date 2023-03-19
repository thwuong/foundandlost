import React, { useEffect } from "react";
import RequestItem from "./RequestItem";

import { useDispatch, useSelector } from "react-redux";
import { getMyRequests, getRequestList } from "../../api/requetsAPI";
function RequestList(props) {
  const { post } = props;
  const { profile, myRequests } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchListRequets = async (postId) => {
      await getRequestList(dispatch, postId);
    };
    const fetchMyRequets = async () => {
      await getMyRequests(dispatch);
    };
    if (post) {
      fetchListRequets();
    } else {
      fetchMyRequets();
    }
  }, [post]);
  return (
    <div>
      {post && post?.id ? (
        myRequests && myRequests.length > 0 ? (
          myRequests.map((request) => {
            if (request.postId === post?.id) {
              return <RequestItem key={request.id} request={request} />;
            }
          })
        ) : (
          <p>Null</p>
        )
      ) : myRequests && myRequests.length > 0 ? (
        myRequests.map((request) => {
          return <RequestItem key={request.id} request={request} />;
        })
      ) : (
        <p>Null</p>
      )}
    </div>
  );
}

export default RequestList;

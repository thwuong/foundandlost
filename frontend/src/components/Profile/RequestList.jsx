import React, { useEffect } from "react";
import RequestItem from "./RequestItem";

import { useDispatch, useSelector } from "react-redux";
import { getMyRequests } from "../../api/requetsAPI";
function RequestList(props) {
  const { profile, myRequests } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyRequets = async () => {
      await getMyRequests(dispatch);
    };
    fetchMyRequets();
  }, []);
  return (
    <div>
      {myRequests && myRequests.length > 0 ? (
        myRequests.map((request) => {
          return <RequestItem key={request.id} request={request} />;
        })
      ) : (
        <p className="text-center">Không có yêu cầu nào!</p>
      )}
    </div>
  );
}

export default RequestList;

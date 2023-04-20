import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from "@chakra-ui/react";
import CardItem from "../CardItem";
import { useDispatch, useSelector } from "react-redux";
import RequestItem from "./RequestItem";
import { editStatusRequest } from "../../api/requetsAPI";
function CardList() {
  const { myPosts, profile } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.request);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleRespone = async (status, postId, requestId) => {
    await editStatusRequest(dispatch, { status, postId }, requestId);
  };
  return (
    <>
      {myPosts && myPosts.length > 0 ? (
        myPosts.map((post) => {
          return (
            <div key={post.id} className="bg-white mb-4 rounded-lg shadow">
              <CardItem item={post} />
              {user.id === profile.id ? (
                <Accordion allowToggle>
                  <AccordionItem border={"none"}>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" className="font-bold">
                        Yêu cầu bài viết
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      {requests && requests.length > 0
                        ? requests.map((request) => {
                            if (request.postId === post.id) {
                              return <RequestItem key={request.id} request={request} handleRespone={handleRespone} />;
                            }
                          })
                        : null}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) : null}
            </div>
          );
        })
      ) : (
        <p>Khoong co bai viet nao</p>
      )}
    </>
  );
}

export default CardList;

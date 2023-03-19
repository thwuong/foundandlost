import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import CardItem from "../CardItem";
import RequestList from "./RequestList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function CardList() {
  const { myPosts, profile } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {myPosts && myPosts.length > 0 ? (
        myPosts.map((post) => {
          return (
            <div key={post.id} className="bg-white px-6 py-2 mb-4 rounded-lg">
              <CardItem item={post} />
              {user.id === profile.id ? (
                <Accordion allowToggle>
                  <AccordionItem border={"none"}>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        className="font-bold"
                      >
                        Yêu cầu bài viết
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      <RequestList post={post} />
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

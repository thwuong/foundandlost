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
import Request from "./Request";
import { getMyItems, getUserItems } from "../../api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function CardList() {
  const { posts, profile } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserItems = async (userId) => {
      await getUserItems(dispatch, userId);
    };
    const fetchMyItems = async () => {
      await getMyItems(dispatch);
    };
    if (userId) {
      fetchUserItems(userId);
    } else {
      fetchMyItems();
    }
  }, []);
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
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
                      <Request post={post.id} />
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

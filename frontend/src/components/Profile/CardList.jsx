import React, { useState } from "react";
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
function CardList() {
  return (
    <>
      <div className="bg-white px-6 py-2 mb-4 rounded-lg">
        <CardItem />
        <Accordion allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" className="font-bold">
                Yêu cầu bài viết (3)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2}>
              <Request />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default CardList;

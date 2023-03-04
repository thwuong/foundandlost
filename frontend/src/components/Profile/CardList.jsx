import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import CardItem from "../CardItem";
function CardList() {
  return (
    <>
      <div className="bg-white p-4 mb-4 rounded-lg">
        <CardItem />
        <Accordion allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" className="font-bold">
                Yêu cầu bài viết (3)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <div className="">
                <div>
                  <span>tôi muốn nhận lại cái này</span>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default CardList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Tbody,
  Tr,
  Td,
  Table,
  Thead,
  Th,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { deleteAccount, getAllAccount } from "../../api/accountAPI";
import { useSelector, useDispatch } from "react-redux";
import { useLoading } from "../../customHooks/useLoading";

import ManageSkeleton from "../Loading/ManageSkeleton";
import AccountRow from "./AccountRow";
function TableContent() {
  const { accounts } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const loading = useLoading();
  const handleRemove = async (status, accountId) => {
    if (status) {
      await deleteAccount(accountId, dispatch);
    }
  };
  useEffect(() => {
    const fetchAllAccount = async () => {
      await getAllAccount(dispatch);
    };
    fetchAllAccount();
  }, []);
  return (
    <>
      <TableContainer overflowX="unset" overflowY="unset">
        {loading ? (
          <ManageSkeleton />
        ) : (
          <Table>
            <Thead position={"sticky"} top={0} zIndex="docked" bg={"white"}>
              <Tr>
                <Th>MSSV</Th>
                <Th>Tên</Th>
                <Th>Số điện thoại</Th>
                <Th>Ngày tham gia</Th>
                <Th>Tùy chọn</Th>
              </Tr>
            </Thead>
            <Tbody>
              {accounts
                ? accounts.map((account) => {
                    return (
                      <AccountRow
                        account={account}
                        key={account.id}
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

export default TableContent;

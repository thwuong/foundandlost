import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Text, Button, Heading, Center } from "@chakra-ui/react";
import Header from "../components/Header";
import Navigate from "../components/Manage/Navigate";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../api/postAPI";
import { getAllAccount } from "../api/accountAPI";
import { getAllCategory } from "../api/categoryAPI";
function StatisticPage() {
  const { post, category, account } = useSelector((state) => state);
  const posts = post.posts;
  const categories = category.categories;
  const accounts = account.accounts;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    labels: ["Tìm thấy", "Bị mất"],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchAllRecord = async () => {
      await getItemList(dispatch);
    };
    const fetchAllUsers = async () => {
      await getAllAccount(dispatch);
    };
    const fetchAllCategory = async () => {
      await getAllCategory(dispatch);
    };
    fetchAllRecord();
    fetchAllUsers();
    fetchAllCategory();
  }, []);

  useEffect(() => {
    posts &&
      setData({
        labels: ["Tìm thấy", "Bị mất"],
        datasets: [
          {
            label: "# of Votes",
            data: [
              posts.filter((p) => p.postType === "Found item").length,
              posts.filter((p) => p.postType === "Lost item").length,
            ],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      });
  }, [posts]);
  return (
    <>
      <div className="bg-main-light bg-no-repeat bg-cover min-h-screen h-full">
        <div className="h-full sm:px-0 px-2 sm:w-11/12 w-full mx-auto overflow-hidden min-h-screen">
          <Header activeTab="manage" />
          <h1 className="my-6 text-primary text-3xl text-center font-bold">THỐNG KÊ</h1>
          <div className="xl:flex-row flex flex-col gap-5 mt-4 xl:h-[60vh] 80vh">
            <div className="xl:w-1/5">
              <Navigate activeNav="statistic" />
            </div>
            <div className="xl:w-4/5 h-full">
              <div className="bg-white/20 rounded-lg max-h-full shadow-xl overflow-y-auto">
                <div className="grid md:grid-cols-3 gap-4 p-4">
                  <Card className="hover:bg-gray-200 duration-300">
                    <CardBody>
                      <box-icon name="user" size="md" color="#2457C5"></box-icon>
                      <Heading size="xl" color={"#2457C5"}>
                        {accounts && accounts.length}
                      </Heading>
                      <Text color={"gray.500"}>Người dùng</Text>
                    </CardBody>
                  </Card>
                  <Card className="hover:bg-gray-200 duration-300 cursor-pointer">
                    <CardBody>
                      <box-icon name="notepad" size="md" color="#2457C5"></box-icon>
                      <Heading size="xl" color={"#2457C5"}>
                        {posts && posts.length}
                      </Heading>
                      <Text color={"gray.500"}>Hồ sơ đồ vật</Text>
                    </CardBody>
                  </Card>
                  <Card className="hover:bg-gray-200 duration-300">
                    <CardBody>
                      <box-icon name="category" size="md" color="#2457C5"></box-icon>
                      <Heading size="xl" color={"#2457C5"}>
                        {categories && categories.length}
                      </Heading>
                      <Text color={"gray.500"}>Danh mục đồ vật</Text>
                    </CardBody>
                  </Card>
                </div>
                {posts && posts.length > 0 ? (
                  <div className="my-4 w-52 flex items-center justify-center ">
                    <Doughnut data={data} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatisticPage;

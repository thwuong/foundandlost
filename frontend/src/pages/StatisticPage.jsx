import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
import { Card, CardBody, Text, Heading, Select } from "@chakra-ui/react";
import Header from "../components/Header";
import Navigate from "../components/Manage/Navigate";
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "../api/postAPI";
import { getAllAccount } from "../api/accountAPI";
import { getAllCategory } from "../api/categoryAPI";
import { getRequestList } from "../api/requetsAPI";
function StatisticPage() {
  const { post, category, account, request } = useSelector((state) => state);
  const posts = post.posts;
  const categories = category.categories;
  const accounts = account.accounts;
  const requests = request.requests;
  const dispatch = useDispatch();
  const [dataDoughnut, setDataDoughnut] = useState({
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
  const nowMonth = new Date().getMonth();
  const [selected, setSelected] = useState("365");
  const labels =
    selected === "365"
      ? [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ]
      : selected === "180"
      ? [
          `Tháng ${nowMonth - 4 === 0 ? 12 : nowMonth - 4 === 13 ? 1 : nowMonth - 4}`,
          `Tháng ${nowMonth - 3 === 0 ? 12 : nowMonth - 3 === 13 ? 1 : nowMonth - 3}`,
          `Tháng ${nowMonth - 2 === 0 ? 12 : nowMonth - 2 === 13 ? 1 : nowMonth - 2}`,
          `Tháng ${nowMonth - 1 === 0 ? 12 : nowMonth - 1 === 13 ? 1 : nowMonth - 1}`,
          `Tháng ${nowMonth === 0 ? 12 : nowMonth === 13 ? 1 : nowMonth}`,
          `Tháng ${nowMonth + 1 === 0 ? 12 : nowMonth + 1 === 13 ? 1 : nowMonth + 1}`,
        ]
      : [
          `Tháng ${nowMonth - 1 === 0 ? 12 : nowMonth - 1 === 13 ? 1 : nowMonth - 1}`,
          `Tháng ${nowMonth === 0 ? 12 : nowMonth === 13 ? 1 : nowMonth}`,
          `Tháng ${nowMonth + 1 === 0 ? 12 : nowMonth + 1 === 13 ? 1 : nowMonth + 1}`,
        ];
  const conditions =
    selected === "365"
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      : selected === "180"
      ? [
          `${nowMonth - 4 === 0 ? 12 : nowMonth - 4 === 13 ? 1 : nowMonth - 4}`,
          `${nowMonth - 3 === 0 ? 12 : nowMonth - 3 === 13 ? 1 : nowMonth - 3}`,
          `${nowMonth - 2 === 0 ? 12 : nowMonth - 2 === 13 ? 1 : nowMonth - 2}`,
          `${nowMonth - 1 === 0 ? 12 : nowMonth - 1 === 13 ? 1 : nowMonth - 1}`,
          `${nowMonth === 0 ? 12 : nowMonth === 13 ? 1 : nowMonth}`,
          `${nowMonth + 1 === 0 ? 12 : nowMonth + 1 === 13 ? 1 : nowMonth + 1}`,
        ]
      : [
          `${nowMonth - 1 === 0 ? 12 : nowMonth - 1 === 13 ? 1 : nowMonth - 1}`,
          `${nowMonth === 0 ? 12 : nowMonth === 13 ? 1 : nowMonth}`,
          `${nowMonth + 1 === 0 ? 12 : nowMonth + 1 === 13 ? 1 : nowMonth + 1}`,
        ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ thống kê số lượng hồ sơ được đăng theo tháng",
      },
    },
  };
  const dataBar = {
    labels,
    datasets: [
      {
        label: "Tìm thấy",
        data: conditions.map(
          (month) =>
            posts.filter((post) => {
              return new Date(post.createdAt).getMonth() + 1 === Number(month) && post.postType === "Found item";
            }).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Bị mất",
        data: conditions.map(
          (month) =>
            posts.filter((post) => {
              return new Date(post.createdAt).getMonth() + 1 === Number(month) && post.postType === "Lost item";
            }).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  useEffect(() => {
    const fetchAllRecord = async () => {
      await getRecords(dispatch, { selected });
    };
    const fetchAllUsers = async () => {
      await getAllAccount(dispatch);
    };
    const fetchAllCategory = async () => {
      await getAllCategory(dispatch);
    };
    const fetchAllRequest = async () => {
      await getRequestList(dispatch);
    };
    fetchAllRecord();
    fetchAllUsers();
    fetchAllCategory();
    fetchAllRequest();
  }, [selected]);

  useEffect(() => {
    posts &&
      setDataDoughnut({
        labels: ["Đang chờ xác thực", "Đã được xác thực"],
        datasets: [
          {
            data: [
              posts.filter((p) => p.status === "pending").length,
              posts.filter((p) => p.status !== "pending").length,
            ],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      });
  }, [posts]);
  console.log(posts);
  return (
    <>
      <div className="bg-main-light bg-no-repeat bg-cover min-h-screen h-full">
        <div className="h-full sm:px-0 px-2 sm:w-11/12 w-full mx-auto overflow-hidden min-h-screen">
          <Header activeTab="manage" />
          <h1 className="my-6 text-primary text-3xl text-center font-bold">THỐNG KÊ</h1>
          <div className="xl:flex-row flex flex-col gap-5 mt-4 xl:h-[70vh] 90vh">
            <div className="xl:w-1/5">
              <Navigate activeNav="statistic" />
            </div>
            <div className="xl:w-4/5 h-full">
              <div className="bg-white/20 rounded-lg max-h-full shadow-xl overflow-y-auto">
                <div className="p-4 md:w-1/4">
                  <Select
                    placeholder="Chọn tùy chọn"
                    value={selected}
                    onChange={(e) => {
                      setSelected(e.target.value);
                    }}
                  >
                    <option value="90">3 Tháng</option>
                    <option value="180">6 Tháng</option>
                    <option value="365">12 Tháng</option>
                  </Select>
                </div>
                <div className="grid md:grid-cols-4 gap-4 p-4">
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
                  <Card className="hover:bg-gray-200 duration-300 cursor-pointer">
                    <CardBody>
                      <box-icon name="question-mark" size="md" color="#2457C5"></box-icon>
                      <Heading size="xl" color={"#2457C5"}>
                        {requests && requests.length}
                      </Heading>
                      <Text color={"gray.500"}>Yêu cầu đồ vật</Text>
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
                  <div className="w-full p-4 flex items-start justify-center gap-4">
                    <div className="w-56 ">
                      <Doughnut data={dataDoughnut} />
                    </div>
                    <div className="w-full h-full">
                      <Bar options={options} data={dataBar} />
                    </div>
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

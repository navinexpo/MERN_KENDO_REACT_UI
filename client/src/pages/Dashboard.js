import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import Marquee from "react-fast-marquee";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { getDataList, verifyUserRequest } from "../services/api";

const pieData = [
  {
    name: "India",
    share: 0.24,
  },
  {
    name: "Russian Federation",
    share: 0.26,
    explode: true,
  },
  {
    name: "Germany",
    share: 0.1,
  },
  {
    name: "World",
    share: 0.4,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [resData, setResData] = useState();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await verifyUserRequest();
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        const responseData = await getDataList();
        setResData(responseData);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <AppBar>
        <AppBarSection>
          <div className="logo">Your Logo</div>
        </AppBarSection>
        <AppBarSection position="end" className="ml-auto">
          <button onClick={logOut} className="btnlogout">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </AppBarSection>
      </AppBar>
      <div className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                className="content"
                style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <h1>
                  Secure React Web App with External API Integration Using
                  KendoReact UI Controls
                </h1>
                <hr />
                <p>
                  "Developing a Secure React Web App with External API
                  Integration, Token Authentication, and KendoReact UI Controls:
                  Retrieving, Presenting, and Refreshing Data Safely
                </p>
              </div>
            </div>
          </div>
          <div className="row mb-3 mt-5">
            <div className="col-md-6 mx-auto">
              <div className="k-card">
                <Chart
                  style={{
                    height: 350,
                  }}
                >
                  <ChartTitle text="Pie Chart" />
                  <ChartLegend position="top" orientation="horizontal" />
                  <ChartSeries>
                    <ChartSeriesItem
                      type="pie"
                      overlay={{
                        gradient: "sharpBevel",
                      }}
                      tooltip={{
                        visible: true,
                      }}
                      data={pieData}
                      categoryField="name"
                      field="share"
                    />
                  </ChartSeries>
                </Chart>
              </div>
            </div>
            <div className="col-md-6 mx-auto">
              <div className="k-card">
                <Grid data={resData} style={{ height: "350px" }}>
                  <GridColumn field="class" title="Class" />
                  <GridColumn field="model" title="Model" />
                  <GridColumn field="make" title="Make" />
                </Grid>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Marquee className="content-white">
                This undertaking involves crafting a secure React web app that
                intricately integrates with a chosen backend and an external
                API, employing token authentication for robust security.
                Leveraging KendoReact UI controls ensures a functional and
                user-friendly experience, with an intentional focus on
                streamlined UI design without additional branding elements.
                Users are urged to uphold vigilant practices in securing API
                credentials to safeguard the overall integrity of the
                application.
              </Marquee>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;

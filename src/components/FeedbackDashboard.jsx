import React, { useEffect, useState } from "react";
import { Container, Table, Form, Stack, Button } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RecordTable from "./RecordTable";
export default function FeedbackDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [toDeleteRecords, setToDeleteRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState([]);
 //  variable that contains final data to pass as a prop
  const data = filterData.length ? filterData : feedbackData;
  const naviagte = useNavigate();

  const getRecordIds = (records) => {
    setToDeleteRecords([...records]);
  };
  const getSearchInput = (e) => {
    setSearchText(e.target.value);
  };
  const searchHandler = () => {
    let updatedlist = feedbackData.filter((record) => {
      if (record.name === searchText) {
        return record;
      } else if (record.email === searchText) {
        return record;
      } else if (record.phone === searchText) {
        return record;
      }
    });

    setFilterData(updatedlist);
  };
  const deleteHandler = () => {
    if (toDeleteRecords.length == 0) {
      Swal.fire({
        icon: "warning",
        text: "Please select atleast one option to delete",
        timer: 5000,
      });
      return;
    }
    const updatedlist = feedbackData.filter(
      (elem) => !toDeleteRecords.includes(elem.id)
    );
    localStorage.setItem("feedbackDb", JSON.stringify(updatedlist));
    let feedbacklist = JSON.parse(localStorage.getItem("feedbackDb"));
    setFeedbackData([...feedbacklist]);
    Swal.fire({
      icon: "success",
      text: "Record deleted successfully.",
      timer: 5000,
    });
    setToDeleteRecords([]);
    // console.log(updatedlist);
  };
  const fetchRecord = () => {
    let feedbacklist = JSON.parse(localStorage.getItem("feedbackDb"))||[];
    setFeedbackData([...feedbacklist]);
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#f8fafb",
          height: "750px",
          padding: "40px",
        }}
      >
        <Stack direction="horizontal" gap={5}>
          <div>
            <h4 className="mb-3" style={{ fontSize: "20px" }}>
              Aromatic bar
            </h4>
            {data.length ? (
              <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>
                {data.length} Records found.
              </p>
            ) : (
              ""
            )}
          </div>
          <Stack direction="horizontal" gap={3} style={{ marginLeft: "auto" }}>
            <Form.Control
              type="text"
              value={searchText}
              style={{ width: "200px" }}
              onChange={getSearchInput}
              placeholder="i.e name , email ,phone"
            />
            <i className="bi bi-search" onClick={searchHandler}></i>
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                marginLeft: "30px",
                border: "transparent",
                fontSize: "18px",
              }}
              onClick={() => {
                setFilterData([]);
                setSearchText("");
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </Button>
            <Button
              style={{
                width: "150px",
                backgroundColor: "green",
                border: "none",
              }}
              onClick={()=>naviagte("/")}
            >
              Add New
            </Button>
          </Stack>
        </Stack>
        {data.length ? (
          <RecordTable data={data} getRecordIds={getRecordIds} />
        ) : (
          <img
            src="https://www.qavenue.in/lander-assets/images/tenor.gif"
            alt=""
            style={{ marginLeft: "30%", marginTop: "50px" }}
          />
        )}
        <Stack style={{ marginTop: "-20px" }}>
          {feedbackData.length && (
            <Button
              style={{
                backgroundColor: "#e84c89",
                border: "none",
                marginLeft: "auto",
              }}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          )}
          {feedbackData.length == 0 && (
            <Button
              style={{
                backgroundColor: "#1ce023",
                border: "none",
                marginLeft: "auto",
              }}
              onClick={() => {
                naviagte("/");
              }}
            >
              Go Back{" "}
            </Button>
          )}
        </Stack>
      </Container>
    </>
  );
}

import React, { useState } from "react";
import { Container, Card, Stack, Form, Button } from "react-bootstrap";
import { phoneData } from "../utils/phoneData";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Feedback() {
  // user state
  const [userinput, setUserInput] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    country: "",
    phone: "",
    serviceRating: [],
    beverageRating: [],
    cleaningRating: [],
    overallRating: [],
  });
  const navigate = useNavigate(); 
  // validation state for form 
  const [isValidate, setIsValidate] = useState({
    name: false,
    name: false,
    email: false,
    country: false,
    phone: false,
    serviceRating: false,
    beverageRating: false,
    cleaningRating: false,
    overallRating: false,
  });
  // form input handler
  const formHandler = (e) => {
    const { value, name } = e.target;
    setUserInput({ ...userinput, [name]: value });
    setIsValidate({
      name: false,
      name: false,
      email: false,
      country: false,
      phone: false,
      serviceRating: false,
      beverageRating: false,
      cleaningRating: false,
      overallRating: false,
    });
  };

  // checkboxes handlers
  const checkboxHanlder1 = (e) => {
    const { checked, value, label } = e.target;
     if (checked) {
      // pushing new checked value
      let serviceRating = userinput.serviceRating;
      serviceRating.push(value);
      setUserInput({ ...userinput, serviceRating: [...serviceRating] }); 
      // resetting the validation object
      setIsValidate({
        name: false,
        name: false,
        email: false,
        country: false,
        phone: false,
        serviceRating: false,
        beverageRating: false,
        cleaningRating: false,
        overallRating: false,
      });
    } else {
      // removing unchecked values form the array 
      let updatedRating = userinput.serviceRating.filter(
        (rating) => rating != value
      );
      setUserInput({ ...userinput, serviceRating: [...updatedRating] });
    }
  };
  const checkboxHanlder2 = (e) => {
    const { checked, value, label } = e.target;
    if (checked) {
      let beverageRating = userinput.beverageRating;
      beverageRating.push(value);
      setUserInput({ ...userinput, beverageRating: [...beverageRating] });
      setIsValidate({
        name: false,
        name: false,
        email: false,
        country: false,
        phone: false,
        serviceRating: false,
        beverageRating: false,
        cleaningRating: false,
        overallRating: false,
      });
    } else {
      let updatedRating = userinput.beverageRating.filter(
        (rating) => rating != value
      );
      setUserInput({ ...userinput, beverageRating: [...updatedRating] });
    }
  };
  const checkboxHanlder3 = (e) => {
    const { checked, value, label } = e.target;
    if (checked) {
      let cleaningRating = userinput.cleaningRating;
      cleaningRating.push(value);
      setUserInput({ ...userinput, cleaningRating: [...cleaningRating] });
      setIsValidate({
        name: false,
        name: false,
        email: false,
        country: false,
        phone: false,
        serviceRating: false,
        beverageRating: false,
        cleaningRating: false,
        overallRating: false,
      });
    } else {
      let updatedRating = userinput.cleaningRating.filter(
        (rating) => rating != value
      );
      setUserInput({ ...userinput, cleaningRating: [...updatedRating] });
    }
  };
  const checkboxHanlder4 = (e) => {
    const { checked, value, label } = e.target;
    if (checked) {
      let overAllRating = userinput.overallRating;
      overAllRating.push(value);
      setUserInput({ ...userinput, overallRating: [...overAllRating] });
      setIsValidate({
        name: false,
        name: false,
        email: false,
        country: false,
        phone: false,
        serviceRating: false,
        beverageRating: false,
        cleaningRating: false,
        overallRating: false,
      });
    } else {
      let updatedRating = userinput.overallRating.filter(
        (rating) => rating != value
      );
      setUserInput({ ...userinput, overallRating: [...updatedRating] });
    }
  };

  const submitFromData = (e) => {
    e.preventDefault();
    let {
      name,
      email,
      phone,
      country,
      serviceRating,
      beverageRating,
      cleaningRating,
      overallRating,
    } = userinput;

    if (!name) {
      setIsValidate({ ...isValidate, name: true });
    } else if (!email) {
      setIsValidate({ ...isValidate, email: true });
    } else if (!phone) {
      setIsValidate({ ...isValidate, phone: true });
    } else if (!country) {
      setIsValidate({ ...isValidate, country: true });
    } else if (!serviceRating.length) {
      setIsValidate({ ...isValidate, serviceRating: true });
    } else if (!beverageRating.length) {
      setIsValidate({ ...isValidate, beverageRating: true });
    } else if (!cleaningRating.length) {
      setIsValidate({ ...isValidate, cleaningRating: true });
    } else if (!overallRating.length) {
      setIsValidate({ ...isValidate, overallRating: true });
    } else {
      // setting up local storage
      let feedbacklist = JSON.parse(localStorage.getItem("feedbackDb")) || [];
      feedbacklist.push(userinput);
      localStorage.setItem("feedbackDb", JSON.stringify(feedbacklist));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Thank you for providing your feedback",
        text: "We will work towards improving your experience",
        confirmButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        } else {
        }
      });
    }
  };

  // console.log(userinput);

  return (
    <>
      <Container
        className="p-3"
        style={{ backgroundColor: "#f8fafb", height: "1000px" }}
        fluid
      >
        <Card style={{ height: "40px", padding: "5px 0px 5px 15px" }}>
          <Stack direction="horizontal" gap={5}>
            <Card.Title>Aromatic bar</Card.Title>
            <Card.Title
              style={{
                marginLeft: "auto",
                marginRight: "40px",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Card.Title>
          </Stack>
        </Card>
        <Card
          style={{
            backgroundColor: "white",
            maxHeight: "800px",
            width: "100%",
            marginTop: "15px",
            padding: "30px",
          }}
        >
          <Form>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Customer Name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eg. jhon doe"
                  style={{ width: "500px" }}
                  onChange={formHandler}
                  name="name"
                  value={userinput.name}
                />
                {isValidate.name && (
                  <p className="warning-text">
                    {" "}
                    <i className="bi bi-exclamation-circle"></i>Please enter the
                    value of the above field
                  </p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Email address<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="E.g. abc@gmail.com"
                  style={{ width: "500px" }}
                  onChange={formHandler}
                  name="email"
                  value={userinput.email}
                />
                {isValidate.email && (
                  <p className="warning-text">
                    {" "}
                    <i className="bi bi-exclamation-circle"></i>Please enter the
                    value of the above field
                  </p>
                )}
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ fontWeight: "bold" }}>
                Phone<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <Form.Select
                  style={{ width: "100px", fontSize: "16px" }}
                  name="country"
                  onChange={formHandler}
                >
                  {phoneData.map((opt) => {
                    return <option key={opt.name}>{opt.name}</option>;
                  })}
                </Form.Select>

                <Form.Control
                  type="text"
                  placeholder="Eg. 9999998988"
                  style={{ width: "390px" }}
                  name="phone"
                  onChange={formHandler}
                  value={userinput.phone}
                />
              </div>
              {isValidate.phone && (
                <p className="warning-text" style={{ width: "40%" }}>
                  {" "}
                  <i className="bi bi-exclamation-circle"></i>Please enter the
                  value of the above field
                </p>
              )}
              {isValidate.country && (
                <p className="warning-text" style={{ width: "40%" }}>
                  {" "}
                  <i className="bi bi-exclamation-circle"></i>Please enter the
                  value of the above field
                </p>
              )}
            </Form.Group>
            <div
              style={{
                width: "92%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Please rate the quality of the service you recieved from the
                  host.<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Stack direction="horizontal" gap={5}>
                  <Form.Check
                    type="checkbox"
                    value="Excellent"
                    label="Excellent"
                    onChange={checkboxHanlder1}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Good"
                    label="Good"
                    onChange={checkboxHanlder1}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Fair"
                    label="Fair"
                    onChange={checkboxHanlder1}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Bad"
                    label="Bad"
                    onChange={checkboxHanlder1}
                  />
                </Stack>
                {isValidate.serviceRating && (
                  <p className="warning-text">
                    {" "}
                    <i className="bi bi-exclamation-circle"></i>Please select
                    atleast one option given above{" "}
                  </p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Please rate the quality of your beverage.
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Stack direction="horizontal" gap={5}>
                  <Form.Check
                    type="checkbox"
                    value="Excellent"
                    label="Excellent"
                    onChange={checkboxHanlder2}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Good"
                    label="Good"
                    onChange={checkboxHanlder2}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Fair"
                    label="Fair"
                    onChange={checkboxHanlder2}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Bad"
                    label="Bad"
                    onChange={checkboxHanlder2}
                  />
                </Stack>
                {isValidate.beverageRating && (
                  <p className="warning-text">
                    {" "}
                    <i className="bi bi-exclamation-circle"></i>Please select
                    atleast one option given above{" "}
                  </p>
                )}
              </Form.Group>
            </div>
            <div
              style={{
                width: "92%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Was our restaurant clean?
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Stack direction="horizontal" gap={5}>
                  <Form.Check
                    type="checkbox"
                    value="Excellent"
                    label="Excellent"
                    onChange={checkboxHanlder3}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Good"
                    label="Good"
                    onChange={checkboxHanlder3}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Fair"
                    label="Fair"
                    onChange={checkboxHanlder3}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Bad"
                    label="Bad"
                    onChange={checkboxHanlder3}
                  />
                </Stack>
                {isValidate.cleaningRating && (
                  <p className="warning-text">
                    {" "}
                    <i className="bi bi-exclamation-circle"></i>Please select
                    atleast one option given above{" "}
                  </p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Please rate your overall dining experience.
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Stack direction="horizontal" gap={5}>
                  <Form.Check
                    type="checkbox"
                    value="Excellent"
                    label="Excellent"
                    onChange={checkboxHanlder4}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Good"
                    label="Good"
                    onChange={checkboxHanlder4}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Fair"
                    label="Fair"
                    onChange={checkboxHanlder4}
                  />
                  <Form.Check
                    type="checkbox"
                    value="Bad"
                    label="Bad"
                    onChange={checkboxHanlder4}
                  />
                </Stack>
                {isValidate.overallRating && (
                  <p className="warning-text">
                    {" "}
                    <i className="bi bi-exclamation-circle"></i>Please select
                    atleast one option given above{" "}
                  </p>
                )}
              </Form.Group>
            </div>
          </Form>
          <div
            style={{
              fontFamily: "sans-serif",
              marginTop: "10px",
              fontStyle: "italic",
              color: "#172329",
            }}
          >
            We are committed to providing you with the best dining experience
            possible, so we welcome your comments. Please fill out this
            questionnaire. Thank you
          </div>
          <Button
            style={{
              width: "200px",
              marginLeft: "auto",
              marginTop: "4%",
              backgroundColor: "green",
              border: "none",
            }}
            onClick={submitFromData}
            type="submit"
          >
            Submit Review
          </Button>
        </Card>
      </Container>
    </>
  );
}

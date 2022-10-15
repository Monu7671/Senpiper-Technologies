import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Checkbox, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function RecordTable({ data, getRecordIds }) {
  const [filterData, setFilterData] = React.useState(data);
  const [selectedRecord, setSelectedRecord] = React.useState([]);
  const navigate = useNavigate();
  // console.log("checked data id" ,selectedRecord)

  const checkBoxHandler = (e, recordId) => {
    if (e.target.checked) {
      let selected = selectedRecord;
      selected.push(recordId);
      setSelectedRecord([...selected]);
    } else {
      let updatedlist = selectedRecord.filter((id) => id !== recordId);
      setSelectedRecord([...updatedlist]);
    }
  };
  React.useEffect(() => {
    getRecordIds(selectedRecord);
  }, [selectedRecord]);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "450px",
        overflow: "hidden",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "50px",
      }}
    >
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Form Details</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Please rate the quality of the service you recieved from the
                host
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Please rate the quality of your beverage.
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Was our restaurant clean?
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Please rate your overall dining experience.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <Checkbox
                        onChange={(e) => {
                          checkBoxHandler(e, row.id);
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "blue", cursor: "pointer" }}>
                      View Details
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.serviceRating}</TableCell>
                    <TableCell>{row.beverageRating}</TableCell>
                    <TableCell>{row.cleaningRating}</TableCell>
                    <TableCell>{row.overallRating}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

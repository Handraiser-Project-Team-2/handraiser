import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Fade from "@material-ui/core/Fade";

import "../../App.css";

import { TableStyle, TableStyle2, TableStyle3 } from "../Styles/Styles2";

// COMPONENTS
import ViewMentorDialog from "./Mentor/ViewMentorDIalog";
import ViewStudentDialog from "./Student/ViewStudentDialog";

export const TableCont = props => {
  const { tabValue } = props;
  const [checked, setChecked] = React.useState(false);

  const [tableData, setTableData] = useState({
    studentCol: [
      {
        title: "",
        field: ""
      },
      {
        title: "Name",
        field: "first_name",
        render: row => (
          <React.Fragment>
            <ViewStudentDialog data={row} />
          </React.Fragment>
        )
      },
      {
        title: "Email",
        field: "email"
      },
      {
        title: "Status",
        field: "user_status",
        render: row =>
          row.user_status === 1 ? (
            <span>
              <status-indicator
                pulse
                positive
                style={{ marginRight: "10px" }}
              />
              <span>Online</span>
            </span>
          ) : (
            <span>
              <status-indicator style={{ marginRight: "10px" }} />
              <span>Offline</span>
            </span>
          )
      }
    ],
    mentorCol: [
      {
        title: "",
        field: ""
      },
      {
        title: "Email",
        field: "validation_email",
        render: row =>
          row.validation_status === "true" ? (
            <ViewMentorDialog data={row} />
          ) : (
            row.validation_email
          )
      },
      {
        title: "Key",
        field: "validation_key"
      },
      {
        title: "Email Status",
        render: row =>
          row.validation_status === "true" ? (
            <div style={{ display: "flex", textAlign: "center" }}>
              <span
                style={{
                  border: "1px solid green",
                  padding: "5px",
                  borderRadius: "5px"
                }}
              >
                <span style={{ color: "green" }}>Verified</span>
              </span>
            </div>
          ) : (
            <span
              style={{
                border: "1px solid red",
                padding: "5px",
                borderRadius: "5px"
              }}
            >
              <span style={{ color: "red" }}>Not yet Verified</span>
            </span>
          )
      },
      {
        title: "Status",
        field: "user_status",
        render: row =>
          row.user_status === 1 ? (
            <span>
              <status-indicator
                active
                pulse
                positive
                style={{ marginRight: "10px" }}
              />
              <span>Online</span>
            </span>
          ) : (
            <span>
              <status-indicator style={{ marginRight: "10px" }} />
              <span>Offline</span>
            </span>
          )
      }
    ],
    classCol: [
      {
        title: "",
        field: ""
      },
      {
        title: "Class Name",
        render: row => (
          <span
            style={{
              wordBreak: "break-word"
            }}
          >
            {row.class_title}
          </span>
        )
      },
      {
        title: "Description",
        render: row => (
          <span
            style={{
              wordBreak: "break-word"
            }}
          >
            {row.class_description}
          </span>
        )
      },
      {
        title: "Date Created",
        render: row => new Date(row.class_date_created).toLocaleString()
      },
      {
        title: "Created by",
        field: "first_name",
        render: row => (
          <React.Fragment>
            <span>{row.last_name + ", " + row.first_name}</span>
          </React.Fragment>
        )
      },
      {
        title: "Status",
        render: row =>
          row.class_status === "open" ? (
            <span
              style={{
                border: "1px solid green",
                padding: "5px",
                borderRadius: "5px"
              }}
            >
              <span style={{ color: "green" }}>Open</span>
            </span>
          ) : (
            <span
              style={{
                border: "1px solid red",
                padding: "5px",
                borderRadius: "5px"
              }}
            >
              <span style={{ color: "red" }}>Closed</span>
            </span>
          )
      }
    ]
  });
  const [studentURL] = useState("/api/user/student_list");
  const [mentorURL] = useState("api/admin/mentor_list");
  const [classURL] = useState("/api/classes");

  const fetchData = async () => {
    let source = axios.CancelToken.source();

    try {
      const student = await axios(studentURL, {
        cancelToken: source.token
      });
      const mentor = await axios(mentorURL, { cancelToken: source.token });
      const classes = await axios(classURL, { cancelToken: source.token });

      if (tabValue === 0) {
        setTableData(tableData => ({ ...tableData, data: student.data }));
      } else if (tabValue === 1) {
        setTableData(tableData => ({ ...tableData, data: mentor.data }));
      } else if (tabValue === 2) {
        setTableData(tableData => ({ ...tableData, data: classes.data }));
      }
    } catch (err) {
      if (axios.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    if (!tableData.data) {
      fetchData();
    }
  }, [tableData]);

  return (
    <React.Fragment>
      {tabValue === 0 ? (
        <TableStyle2>
          <MaterialTable
            title=""
            columns={tableData.studentCol}
            data={tableData.data}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
              actionsColumnIndex: -1,
              draggable: false,
              headerStyle: {
                fontSize: 18
              },
              cellStyle: {
                width: 900,
                maxWidth: 280
              }
            }}
          />
        </TableStyle2>
      ) : tabValue === 1 ? (
        <TableStyle>
          <MaterialTable
            title=""
            columns={tableData.mentorCol}
            data={tableData.data}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
              actionsColumnIndex: -1,
              draggable: false,
              headerStyle: {
                fontSize: 18
              },
              cellStyle: {
                width: 900,
                maxWidth: 280
              }
            }}
          />
        </TableStyle>
      ) : (
        <TableStyle3>
          <MaterialTable
            title=""
            columns={tableData.classCol}
            data={tableData.data}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
              actionsColumnIndex: -1,
              draggable: false,
              headerStyle: {
                fontSize: 18
              },
              cellStyle: {
                width: 900,
                maxWidth: 280
              }
            }}
          />
        </TableStyle3>
      )}
    </React.Fragment>
  );
};

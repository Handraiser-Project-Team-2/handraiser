import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
// import EditIcon from "@material-ui/icons/Edit";
// import Button from "@material-ui/core/Button";
// import { Tooltip } from "@material-ui/core";
import axios from "axios";
import Fade from "@material-ui/core/Fade";

import "../../App.css";

import { TableStyle, TableStyle2 } from "../../Styles/Styles";

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
                style={{ marginRight: "10px", marginLeft: "10px" }}
              />
              <span>Active</span>
            </span>
          ) : (
            <span>
              <status-indicator negative style={{ marginRight: "10px" }} />
              <span>Inactive</span>
            </span>
          )
      }
      // {
      //   title: "Actions",
      //   field: "",
      //   render: rowData => (
      //     <React.Fragment>
      //       <RowCont>
      //         <Tooltip title="Edit">
      //           <Button>
      //             <EditIcon />
      //           </Button>
      //         </Tooltip>
      //       </RowCont>
      //     </React.Fragment>
      //   )
      // }
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
        field: "validation_status",
        render: row =>
          row.validation_status === "true" ? "Verified" : "Not yet Verified"
      },
      {
        title: "Status",
        field: "user_status",
        render: row =>
          tabValue === 1 ? (
            row.user_status === 1 ? (
              <span>
                <status-indicator
                  active
                  pulse
                  positive
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                />
                <span>Active</span>
              </span>
            ) : (
              <span>
                <status-indicator negative style={{ marginRight: "10px" }} />
                <span>Inactive</span>
              </span>
            )
          ) : (
            ""
          )
      }
    ],
    adminCol: [
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
        field: "validation_status",
        render: row =>
          row.validation_status === "true" ? "Verified" : "Not yet Verified"
      }
    ]
  });
  const [mentorURL] = useState("api/admin/mentor_list");
  const [adminURL] = useState("/api/admin/admins_list");
  const [studentURL] = useState("/api/user/student_list");

  useEffect(() => {
    if (!tableData.data) {
      fetchData();
    }
  }, [tableData]);

  const fetchData = async () => {
    let source = axios.CancelToken.source();

    try {
      const mentor = await axios(mentorURL, { cancelToken: source.token });
      const admin = await axios(adminURL, { cancelToken: source.token });
      const student = await axios(studentURL, {
        cancelToken: source.token
      });
      if (tabValue === 0) {
        setTableData(tableData => ({ ...tableData, data: student.data }));
      } else if (tabValue === 1) {
        setTableData(tableData => ({ ...tableData, data: mentor.data }));
      } else if (tabValue === 2) {
        setTableData(tableData => ({ ...tableData, data: admin.data }));
      }
    } catch (err) {
      if (axios.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  return (
    <React.Fragment>
      {tabValue === 0 ? (
        <TableStyle2>
          <MaterialTable
            title=""
            columns={
              tabValue === 1
                ? tableData.mentorCol
                : tabValue === 2
                ? tableData.adminCol
                : tableData.studentCol
            }
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
      ) : (
        <TableStyle>
          <MaterialTable
            title=""
            columns={
              tabValue === 1
                ? tableData.mentorCol
                : tabValue === 2
                ? tableData.adminCol
                : tableData.studentCol
            }
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
      )}
    </React.Fragment>
  );
};

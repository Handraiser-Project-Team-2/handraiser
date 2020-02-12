import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import { Row, TableStyle } from "../Styles/Styles2";

// COMPONENTS
import ViewStudentDialog from "./Student/ViewStudentDialog";

export const StudentTable = props => {
  const { tabValue } = props;
  const [tableData, setTableData] = useState({
    columns: [
      {
        title: "",
        field: ""
      },
      {
        title: "Name",
        field: "first_name",
        render: row => (
          <React.Fragment>
            <ViewStudentDialog data={row}>
              {row.first_name + " " + row.last_name}
            </ViewStudentDialog>
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
        render: row => (row.user_status === 1 ? "Active" : "Inactive")
      },
      {
        title: "Action",
        field: ""
      }
    ],
    data: []
  });
  const [studentURL] = useState("http://localhost:5000/api/user/student_list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const student = await axios(studentURL);
        if (tabValue === 0) {
          setTableData(tableData => ({ ...tableData, data: student.data }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [studentURL, tabValue]);

  return (
    <TableStyle>
      <MaterialTable
        title=""
        columns={tableData.columns}
        data={tableData.data}
        options={{
          pageSize: 5,
          sorting: false,
          pageSizeOptions: [5, 10, 15, 20],
          actionsColumnIndex: -1,
          draggable: false,
          headerStyle: {
            fontSize: 18
          },
          cellStyle: {
            width: 900,
            maxWidth: 287
          }
        }}
      />
    </TableStyle>
  );
};

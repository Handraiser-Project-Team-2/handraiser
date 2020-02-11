import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import axios from "axios";
import "../../App.css";

import { RowCont, TableStyle } from "../Styles/Styles";

// COMPONENTS
import ViewMentorDialog from "./Mentor/ViewMentorDIalog";

export const TableCont = props => {
  const { tabValue } = props;
  const [tableData, setTableData] = useState({
    columns: [
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
        title: "Status",
        field: "validation_status",
        render: row =>
          row.validation_status === "true" ? "Verified" : "Not yet Verified"
      },
      {
        title: "Key",
        field: "validation_key"
      },
      {
        title: "Action",
        field: "",
        render: rowData => (
          <React.Fragment>
            <RowCont>
              <Tooltip title="Delete">
                <Button>
                  <DeleteIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Verify">
                <Button>
                  <EditIcon />
                </Button>
              </Tooltip>
            </RowCont>
          </React.Fragment>
        )
      }
    ],
    data: []
  });
  const [mentorURL] = useState("http://localhost:5000/api/admin/mentor_list");
  const [adminURL] = useState("http://localhost:5000/api/admin/admins_list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentor = await axios(mentorURL);
        const admin = await axios(adminURL);

        if (tabValue === 1) {
          setTableData(tableData => ({
            ...tableData,
            data: mentor.data
          }));
        } else if (tabValue === 2) {
          setTableData(tableData => ({
            ...tableData,
            data: admin.data
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [mentorURL, adminURL, tabValue]);

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
            maxWidth: 280
          }
        }}
      />
    </TableStyle>
  );
};

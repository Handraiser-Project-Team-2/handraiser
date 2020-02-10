import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import axios from "axios";

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
            </RowCont>
          </React.Fragment>
        )
      }
    ],
    data: []
  });
  const [mentorURL, setMentorURL] = useState(
    "http://localhost:5000/api/admin/mentor_list"
  );
  const [adminURL, setAdminURL] = useState(
    "http://localhost:5000/api/admin/admins_list"
  );
  const [isError, setIsError] = useState(false);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const mentor = await axios.get(mentorURL, {
          cancelToken: source.token
        });
        const admin = await axios.get(adminURL, { cancelToken: source.token });

        if (tabValue === 1) {
          setTableData({ ...tableData, data: mentor.data });
        } else if (tabValue === 2) {
          setTableData({ ...tableData, data: admin.data });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("", err.message);
        } else {
          setIsError(true);
        }
      }
    };
    fetchData();

    return () => {
      source.cancel("");
    };
  }, [tableData]);

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
            textAlign: "center",
            fontSize: 18
          },
          cellStyle: {
            textAlign: "center",
            width: 5,
            maxWidth: 50
          }
        }}
      />
    </TableStyle>
  );
};

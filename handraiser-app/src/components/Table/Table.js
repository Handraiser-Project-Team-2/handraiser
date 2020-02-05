import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Zoom from "@material-ui/core/Zoom";
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
              <Tooltip TransitionComponent={Zoom} title="Delete">
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

  useEffect(() => {
    (async function() {
      try {
        const res = await axios("http://localhost:5000/api/admin/mentor_list");
        const res2 = await axios("http://localhost:5000/api/admin/admins_list");
        if (tabValue === 1) {
          setTableData({ ...tableData, data: res.data });
        } else if (tabValue === 2) {
          setTableData({ ...tableData, data: res2.data });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

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
          selection: false,
          draggable: false,
          paging: false,
          headerStyle: {
            textAlign: "center",
            fontSize: 18
          },
          cellStyle: {
            textAlign: "center",
            width: 20,
            maxWidth: 20
          }
        }}
      />
    </TableStyle>
  );
};

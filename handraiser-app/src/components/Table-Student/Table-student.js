import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import axios from "axios";

import { RowCont, TableStyle } from "../Styles/Styles";

export const StudentTable = props => {
  const [tableData, setTableData] = useState({
    columns: [
      {
        title: "",
        field: ""
      },
      {
        title: "Email",
        field: "validation_email"
      },
      {
        title: "Status",
        field: "validation_status"
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

  //   useEffect(() => {
  //     (async function() {
  //       try {
  //         const all = await axios("");
  //         setTableData({ ...tableData, data: all.data });
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     })();
  //   }, []);

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

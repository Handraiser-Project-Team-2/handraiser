import React, { useState } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";

import { RowCont } from "../Styles/Styles";

export const TableCont = props => {
  const { tabValue } = props;
  const [state, setState] = useState({
    columns: [
      {
        title: "Email",
        field: "email",
        render: rowData => (
          <React.Fragment>
            <RowCont>{rowData.email}</RowCont>
          </React.Fragment>
        )
      },
      {
        title: "Key",
        field: "key",
        render: rowData => (
          <React.Fragment>
            <RowCont>{rowData.key}</RowCont>
          </React.Fragment>
        )
      },
      {
        title: "Action",
        field: "",
        render: rowData => (
          <React.Fragment>
            <RowCont>
              <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                <Button>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </RowCont>
          </React.Fragment>
        )
      }
    ],
    data: [
      { email: "jerommel.astillero@gmail.com", key: "Baran", birthYear: 1987 }
    ]
  });

  console.log(props.tabValue);

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      options={{
        pageSize: 10,
        sorting: false,
        pageSizeOptions: [10, 15, 20],
        actionsColumnIndex: -1,
        selection: false,
        paginationType: "stepped",
        headerStyle: {
          textAlign: "center"
        }
      }}
    />
  );
};

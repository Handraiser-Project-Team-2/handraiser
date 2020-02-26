import React, { useState } from "react";
import MaterialTable from "material-table";

import ViewClassDialog from "../Class/ViewClassDialog";

export default function StudentClass({ classData, profileData }) {
  const [tableData] = useState({
    columns: [
      {
        title: "",
        field: ""
      },
      {
        title: "Class Name",
        field: "class_title",
        render: row => (
          <span
            style={{
              wordBreak: "break-word"
            }}
          >
            <ViewClassDialog data={row} />
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
        title: "Mentor",
        field: "first_name",
        render: row => (
          <React.Fragment>
            <span>{`${row.last_name}, ${row.first_name}`}</span>
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
    ],
    data: classData
  });
  return (
    <React.Fragment>
      <MaterialTable
        title={`${profileData.first_name}'s classes`}
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
    </React.Fragment>
  );
}

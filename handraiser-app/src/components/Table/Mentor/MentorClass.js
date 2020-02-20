import React, { useState } from "react";
import MaterialTable from "material-table";

// import { TableCol } from "../../Styles/Styles2";

export default function MentorClass({ classData, profileData }) {
  const [tableData] = useState({
    columns: [
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
      },
      {
        title: "Key",
        field: "classroom_key"
      }
    ],
    data: classData
  });
  return (
    // <ModalTable>
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
    // </ModalTable>
  );
}

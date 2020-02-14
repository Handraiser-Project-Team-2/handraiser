import React, { useState } from "react";
import MaterialTable from "material-table";

export default function MentorClass({ classData, profileData }) {
  const [tableData] = useState({
    columns: [
      {
        title: "",
        field: ""
      },
      {
        title: "Class Name",
        field: "class_title"
      },
      {
        title: "Description",
        field: "class_description"
      },
      {
        title: "Date Created",
        field: "class_date_created"
        // render: row => Date.parse(row.class_date_created)
      },
      {
        title: "Status",
        field: "class_status"
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

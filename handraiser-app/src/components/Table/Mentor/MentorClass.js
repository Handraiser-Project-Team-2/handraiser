import React, { useState } from "react";
import MaterialTable from "material-table";

import { TableStyle } from "../../Styles/Styles";

export default function MentorClass({ classData, profileData }) {
  const [tableData] = useState({
    columns: [
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
        // field: "class_date_created",
        render: row => Date(row.class_date_created)
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
    <TableStyle>
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
          paginationType: "stepped",
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
}

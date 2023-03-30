import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/layout/Header";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Blog} from "../../data/mockData"

/* import { ListBlog } from "api/apiJs"; */

const Customers = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Titulo da noticia",
      flex: 0.5,
    },
    {
      field: "conteudo",
      headerName: "Conteudo do blog",
      flex: 1,
    },
/*     {
      field: "post_day",
      headerName: "Data da postagem",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    }, */
    {
      field: "image",
      headerName: "Imagem",
      flex: 0.4,
    },

/*     {
      field: "Edit",
      headerName: "Editar",
      renderCell: (params) => (
        <Button
          sx={{ color: theme.palette.grey[100] }}
          onClick={() => Edit(params)}
        >
          <EditIcon />
        </Button>
      ),
    }, */
  ];

/*   const Edit = (params) => {
    navigate(`/editar/${params.row.friendly_url}`);
  }; */

/*   useEffect(() => {
    (async () => {
      const response = await ListBlog();
      console.log(response.data);
      // Add a unique id property to each row using the uuid property
      const updatedRows = response.data.map((row) => ({
        ...row,
        id: row.uuid,
      }));
      setRows(updatedRows);
    })();
  }, []); */

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Todas as noticias" subtitle="Deseja editar ou excluir ?" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.main,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.main,
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary.main} !important`,
          },
        }}
      >
        <DataGrid rows={Blog} columns={columns} />
      </Box>
    </Box>
  );
};

export default Customers;

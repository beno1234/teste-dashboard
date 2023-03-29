/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, ChangeEvent } from "react";
import { Box, TextField, Button, Input } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { mixed, object, string } from "yup";
import { Alert, Snackbar } from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
/* import { CreateBlog } from "api/api"; */

const AddNews = () => {
  const editorRef = useRef({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  const validationSchema = object({
    news_title: string().required("Título da notícia é obrigatório"),
    friendly_url: string().required("URL amigável é obrigatória"),
    news: string().required("Texto é obrigatório"),
    photo: mixed().required("foto requerida"),
  });

  const initialValues = {
    news_title: "",
    news: "",
    friendly_url: "",
    photo: null,
  };



  const generateFriendlyUrl = (sluged: string) => {
    if (sluged) {
      return sluged
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "") // remove caracteres especiais
        .replace(/\s+/g, "-");
    }
    return "";
  };

  const handleFormSubmit = async (values: any) => {
    /* const blogresponse = await CreateBlog(values); */
    console.log(values);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <h1>Adicionar notícia</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleSubmit,
        }) => {
          console.log(values.photo);
          return (
            <Form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Título da notícia"
                  name="news_title"
                  value={values.news_title}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "friendly_url",
                      generateFriendlyUrl(e.target.value)
                    );
                  }}
                  error={touched.news_title && Boolean(errors.news_title)}
                  helperText={touched.news_title && errors.news_title}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="URL amigável"
                  name="friendly_url"
                  value={values.friendly_url}
                  error={touched.friendly_url && Boolean(errors.friendly_url)}
                  helperText={touched.friendly_url && errors.friendly_url}
                  sx={{ gridColumn: "span 4" }}
                />

                <Box gridColumn="span 4">
                  <Input
                    type="file"
                    name="photo"
                    error={touched.photo && Boolean(errors.photo)}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("photo", event.currentTarget.files ? event.currentTarget.files[0] : null)
                    }
                    sx={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="contained"
                      style={{ marginBottom: "50px" }}
                    >
                      Selecionar imagem da Thumbnail{" "}
                    </Button>
                    <ErrorMessage name="photo" />
                  </label>
                  {values.photo && (
                    <Box mt={2}>
                      <img
                        src={URL.createObjectURL(values.photo)}
                        alt="Imagem selecionada"
                        height={150}
                      />
                    </Box>
                  )}
                  <Editor
                    apiKey="viiwppty89zoj2ex6gskhuivci8cq7yyjixu3v6ahicpbsuc"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={(news) => setFieldValue("news", news)}
                    init={{
                      // Select the element(s) to add TinyMCE to using any valid CSS selector
                      

                      // Tip - To keep TinyMCE lean, only include the plugins you need.
                      plugins:
                        "a11ychecker advcode advlist advtable anchor autocorrect autolink autosave editimage fullscreen image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",

                      // Configure the toolbar so it fits your app. There are many
                      // different configuration options available:
                      // https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/
                      toolbar:
                        "undo redo | styles | bold italic underline strikethrough | align | table link image media pageembed | bullist numlist outdent indent | spellcheckdialog a11ycheck typography code | fullscreen",

                      // Specify the height of the editor, including toolbars and the statusbar.
                      // https://www.tiny.cloud/docs/tinymce/6/customize-ui/#changing-editor-height-and-width
                      height: 540,
                    }}
                  />
                  <ErrorMessage name="news" />
                </Box>

                <Button type="submit" variant="contained">
                  Adicionar notícia
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          Notícia adicionada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddNews;

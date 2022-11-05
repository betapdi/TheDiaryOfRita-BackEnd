import PropTypes from 'prop-types';
import React from 'react';

import { FastField, Form, Formik } from 'formik'; //Remember to use 'Form' of formik instead of reactstrap
import { Button, FormGroup } from 'reactstrap';
import { TESTING_OPTIONS } from '../../../../constances/dev-mode/options';
import SelectField from '../../../../custom-fields/SelectField';
import TextField from '../../../../custom-fields/TextField';

import * as Yup from 'yup';
import FileChooser from '../../../../custom-fields/FileChooser';

const AddMangaForm = (props) => {
  const initialValues = {
    mangaName: '', //for empty string
    description: '',
    categories: null, //for options, actions
    cover_image: null,
  }

  const validationSchema = Yup.object().shape({
      mangaName: Yup.string().required('This field is required.'),

      description: Yup.string().required('This field is required.'),

      categories: Yup.array().min(1, 'This field need at least 1 item').required('This field is required.').nullable(),
  })

  return (
    <Formik 
      initialValues = {initialValues}
      validationSchema = {validationSchema}
      onSubmit = {props.onSubmit}
    >
      {formikProps => {
        //do something here...

        const  { values, errors, touched } = formikProps;
        // console.log({ values, errors, touched })

        return (
          //Field will rerender when the other or itself was touched, FastField won't
          //For details: Field will be dependent, FastField is independent
          <Form>
            <FastField
              name = "mangaName"
              component = {TextField}

              label = "Manga Name"
              placeholder = "Eg: Han Deep Try..."
            />

            <FastField
              name = "description"
              component = {TextField}

              label = "Description"
              placeholder = "Eg: Han Deep Try..."
            />

            <FastField
              name = "categories"
              component = {SelectField}

              label = "Categories"
              placeholder = "Choose your manga's categories"
              type = "multiple"
              options = {TESTING_OPTIONS}
            />

            <FastField
              name = "cover_image"
              type = "file"
              component = {FileChooser}

              label = "FileChooser"
            />

            <FormGroup>
              <Button type = "submit" color = "primary">Add new Manga</Button>
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  )
}

AddMangaForm.propTypes = {
  onSubmit: PropTypes.func,
}

AddMangaForm.defaultProps = {
  onsubmit: null,
}

export default AddMangaForm
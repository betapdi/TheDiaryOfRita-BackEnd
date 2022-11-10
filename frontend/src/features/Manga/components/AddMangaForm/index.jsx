import PropTypes from 'prop-types';
import React from 'react';

import { FastField, Form, Formik } from 'formik'; //Remember to use 'Form' of formik instead of reactstrap
import { Button, FormGroup } from 'reactstrap';
import { TESTING_OPTIONS } from '../../../../constances/dev-mode/options';
import SelectField from '../../../../custom-fields/SelectField';
import InputField from '../../../../custom-fields/InputField';

import * as Yup from 'yup';
import FileChooser from '../../../../custom-fields/FileChooser';
import { useEffect } from 'react';
import { getCategoryList } from '../../slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const AddMangaForm = (props) => {
  //fetch needded data
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategoryList = async () => {
      dispatch(getCategoryList())
    }

    fetchCategoryList()
  }, [])

  const CATEGORY_OPTIONS = useSelector(state => state.categoryList)  

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
  
      cover_image: Yup.string().required("This field is required").nullable(),
    })

  return (
    <div>
      {CATEGORY_OPTIONS.length > 0 &&
        <Formik 
          initialValues = {initialValues}
          validationSchema = {validationSchema}
          onSubmit = {props.onSubmit}
        >
          {formikProps => {
            //do something here...

            const  { values, errors, touched } = formikProps;
            console.log(TESTING_OPTIONS)
            // console.log({ values, errors, touched })

            return (
              //Field will rerender when the other or itself was touched, FastField won't
              //For details: Field will be dependent, FastField is independent
              <Form>
                <FastField
                  name = "mangaName"
                  component = {InputField}

                  label = "Manga Name"
                  placeholder = "Eg: Han Deep Try..."
                />

                <FastField
                  name = "description"
                  component = {InputField}

                  label = "Description"
                  placeholder = "Eg: Han Deep Try..."
                />

                <FastField
                  name = "categories"
                  component = {SelectField}

                  label = "Categories"
                  placeholder = "Choose your manga's categories"
                  type = "multiple"
                  options = {CATEGORY_OPTIONS}
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
      }
    </div>
  )
}

AddMangaForm.propTypes = {
  onSubmit: PropTypes.func,
}

AddMangaForm.defaultProps = {
  onsubmit: null,
}

export default AddMangaForm
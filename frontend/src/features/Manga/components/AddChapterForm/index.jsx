import PropTypes from 'prop-types';
import React from 'react';

import { FastField, Form, Formik } from 'formik'; //Remember to use 'Form' of formik instead of reactstrap
import { Button, FormGroup } from 'reactstrap';
import SelectField from '../../../../custom-fields/SelectField';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FileChooser from '../../../../custom-fields/FileChooser';
import InputField from '../../../../custom-fields/InputField';
import { getManga } from '../../slices/mangaListSlice';

const AddChapterForm = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchMangaList = async () => {
      dispatch(getManga())
    }

    fetchMangaList()
  }, [])

  const MANGA_OPTIONS = useSelector(state => state.mangaList);
  
  const initialValues = {
    manga_name: null,
    chapter_id: "",
    chapter_data: null,
  }

  const validationSchema = Yup.object().shape({
      manga_name: Yup.string().required('This field is required.'),

      chapter_id: Yup.string().required('This field is required.'),
  
      chapter_data: Yup.string().required("This field is required").nullable(),
    })

  return (
    <div>
      {MANGA_OPTIONS.length > 0 &&
        <Formik 
          initialValues = {initialValues}
          validationSchema = {validationSchema}
          onSubmit = {props.onSubmit}
        >
          {formikProps => {
            return (
              <Form>
                <FastField
                  name = "manga_name"
                  component = {SelectField}

                  label = "Manga"
                  placeholder = "Choose your manga"
                  type = "single"
                  options = {MANGA_OPTIONS}
                />
                
                <FastField
                  name = "chapter_id"
                  component = {InputField}

                  label = "Chapter ID"
                  placeholder = "Eg: Oang Oang..."
                />

                <FastField
                  name = "chapter_data"
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

AddChapterForm.propTypes = {
  onSubmit: PropTypes.func,
}

AddChapterForm.defaultProps = {
  onsubmit: null,
}

export default AddChapterForm
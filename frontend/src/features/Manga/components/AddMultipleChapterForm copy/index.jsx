import PropTypes from 'prop-types';
import React from 'react';

import { FastField, Form, Formik } from 'formik'; //Remember to use 'Form' of formik instead of reactstrap
import { Button, FormGroup } from 'reactstrap';
import SelectField from '../../../../custom-fields/SelectField';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FileChooser from '../../../../custom-fields/FileChooser';
import MultipDataInputField from '../../../../custom-fields/MultipDataInputField';
import { getAllManga } from '../../slices/mangaListSlice';

const AddMultipleChapterForm = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchMangaList = async () => {
      dispatch(getAllManga())
    }

    fetchMangaList()
  }, [])

  const MANGA_OPTIONS = useSelector(state => state.mangaList);
  
  const initialValues = {
    manga_name: null,
    chapters_id: null,
    chapters_data: null,
  }

  const validationSchema = Yup.object().shape({
      manga_name: Yup.string().required('This field is required.'),

      chapter_id: Yup.array().min(1, 'This field need at least 1 item').required('This field is required.').nullable(),
      
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
                  name = "chapter_data"
                  type = "file"
                  component = {FileChooser}

                  accept = ".zip"
                  label = "Chapters Zip Data"
                />

                <FormGroup>
                  <Button type = "submit" color = "primary">Add Chapter</Button>
                </FormGroup>
              </Form>
            )
          }}
        </Formik>
      }
    </div>
  )
}

AddMultipleChapterForm.propTypes = {
  onSubmit: PropTypes.func,
}

AddMultipleChapterForm.defaultProps = {
  onsubmit: null,
}

export default AddMultipleChapterForm
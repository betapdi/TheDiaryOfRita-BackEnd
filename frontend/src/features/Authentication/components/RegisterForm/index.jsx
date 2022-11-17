import React from 'react'
import PropTypes from 'prop-types'

import { FastField, Form, Formik } from 'formik'
import { Button, FormGroup } from 'reactstrap';
import InputField from '../../../../custom-fields/InputField';

const RegisterForm = (props) => {
  const initialValues = {
    username: '',
    password: '',
    email: '',
  }

  return (
    <Formik
      initialValues = {initialValues}
      onSubmit = {props.onSubmit}
    >
      {formikProps => {
        const {values, errors, touched } = formikProps
        // console.log({values, errors, touched })

        return (
          <Form>
            <FastField
              name = "username"
              component = {InputField}

              label = "Username"
              placeholder = "Input your Username"
            />

            <FastField
              name = "email"
              component = {InputField}

              label = "Email"
              type = "email"
              placeholder = "Input your Email"
            />

            <FastField
              name = "password"
              component = {InputField}

              label = "Password"
              type = "password"
              placeholder = "Input your password"
            />

            <FormGroup>
              <Button type = "submit" color = "primary">Register</Button>
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  )
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
  onSubmit: null,
}

export default RegisterForm
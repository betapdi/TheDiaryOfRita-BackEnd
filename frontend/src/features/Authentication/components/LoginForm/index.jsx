import React from 'react'
import PropTypes from 'prop-types'

import { FastField, Form, Formik } from 'formik'
import { Button, FormGroup } from 'reactstrap';
import InputField from '../../../../custom-fields/InputField';

const LoginForm = (props) => {
  const initialValues = {
    username: '',
    password: '',
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
              name = "password"
              component = {InputField}

              label = "Password"
              type = "password"
              placeholder = "Input your password"
            />

            <FormGroup>
              <Button type = "submit" color = "primary">Login</Button>
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
  onSubmit: null,
}

export default LoginForm
import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const FileChooser = (props) => {
  const { field, form, label, type, accept} = props
  const { name, onChange, onBlur } = field

  const {errors, touched} = form
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for = {name}>{label}</Label>}

      <Input
        id = {name}

        type = {type}
        onChange = {(e) => form.setFieldValue(field.name, e.target.files[0])}

        accept = {accept}
        className = {showError ? 'is-invalid' : ''}
      />

      <ErrorMessage name = {name} component = {FormFeedback} />
    </FormGroup>
  )
}

FileChooser.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  accept: PropTypes.string,
}

FileChooser.defaultProps = {
  accept: "*"
}

export default FileChooser
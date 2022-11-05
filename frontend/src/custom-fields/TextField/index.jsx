import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { ErrorMessage } from 'formik'

const TextField = (props) => {
  const {
    field, form, //props of fastfield
    type, label, placeholder, disabled, //our props
  } = props

  const {name, value, onChange, onBlur} = field //defaults

  const {errors, touched} = form
  const showError = errors[name] && touched[name]
   
  return (
    <FormGroup>
      {label && <Label for = {name}>{label}</Label>}
      <Input 
        id = {name} 
        {...field}
        //or use this:
        // name = {name} 
        // value = {value}
        // onChange = {onChange}
        // onBlur = {onBlur} 
        type = {type}
        disabled = {disabled}
        placeholder = {placeholder} 

        invalid = {showError}
      />

      <ErrorMessage name = {name} component = {FormFeedback} />
    </FormGroup>
  )
}

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

TextField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

export default TextField
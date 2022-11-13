import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import { FormFeedback, FormGroup, Label } from 'reactstrap'

const SelectField = (props) => {
  const { field, form, options, label, placeholder, disabled, type} = props
  const { name, value, onChange, onBlur } = field

  const {errors, touched} = form
  const showError = errors[name] && touched[name]

  const handleSelectedOptionsChange = (selectedOptions) => {
    const isMulti = (type === 'multiple')

    form.setFieldValue(field.name, 
      !isMulti ? (selectedOptions ? selectedOptions.value : selectedOptions)
      : (selectedOptions != null ? selectedOptions.map((item) => item.value) : null)
      )
  }

  const getValues = () => {
    const isMulti = (type === 'multiple')
    if (!options || !field.value) return isMulti ? null : '';

    return isMulti 
      ? options.filter((option) => field.value.indexOf(option.value) >= 0)
      : options.find((option) => option.value === field.value)
  }

  return (
    <FormGroup>
      {label && <Label for = {name}>{label}</Label>}

      <Select
        id = {name}
        {...field}
        onChange = {handleSelectedOptionsChange}
        value = {getValues()}

        isMulti = {type === 'multiple'}
        placeholder = {placeholder}
        disabled = {disabled}
        options = {options} 

        className = {showError ? 'is-invalid' : ''}
      />

      <ErrorMessage name = {name} component = {FormFeedback} />
    </FormGroup>
  )
}

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  type: PropTypes.string,
}

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  type: 'single',
}

export default SelectField
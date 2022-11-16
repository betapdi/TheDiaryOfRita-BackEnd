import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const MultipDataInputField = (props) => {
  let datasAfterSplit = [];

  const {
    field, form, //props of fastfield
    type, label, placeholder, regex //our props
  } = props
  
  const {name, value, onChange, onBlur} = field //defaults

  const {errors, touched} = form
  const showError = errors[name] && touched[name]
  
  const getValueAfterSplit = () => { 
    if (field.value === undefined) return "";

    const inputValue = field.value;
    datasAfterSplit = String(inputValue).split(regex);
    
    return datasAfterSplit;
  }

  const handleValueChange = async (value) => {
    if (!String(value.nativeEvent.inputType).localeCompare("deleteContentBackward")) {
      // console.log(datasAfterSplit);
      datasAfterSplit.pop();
      // console.log(datasAfterSplit);
      await form.setFieldValue(field.name, datasAfterSplit);
      return;
    }
    
    if (field.value === undefined) field.value = "";
    field.value += value.nativeEvent.data;
    
    const inputValue = field.value;
    datasAfterSplit = String(inputValue).split(regex);
    
    await form.setFieldValue(field.name, datasAfterSplit);
  }

  return (
    <FormGroup>
      {label && <Label for = {name}>{label}</Label>}
      <Input 
        id = {name} 
        {...field}
        //or use this:
        // name = {name} 
        // onChange = {onChange}
        // onBlur = {onBlur} 
        
        onChange = {handleValueChange}
        value = {getValueAfterSplit()}
        regex = {regex}
        type = {type}
        placeholder = {placeholder} 

        invalid = {showError}
      />

      <ErrorMessage name = {name} component = {FormFeedback} />
    </FormGroup>
  )
}

MultipDataInputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}

MultipDataInputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
}

export default MultipDataInputField
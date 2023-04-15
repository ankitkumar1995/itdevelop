import { Field } from 'formik';
const CustomField = ({
  id,
  type,
  options,
  value,
  isRequired,
  label,
  touched,
  errors,
}) => {
  let field = '';
  let labelContent = '';
  if (label) {
    labelContent = (
      <label htmlFor={id}>
        {' '}
        {label}{' '}
        {isRequired ? (
          <span className="required" style={{ color: 'red' }}>
            *
          </span>
        ) : (
          ''
        )}
      </label>
    );
  }
  let errorContent = '';
  if (touched && errors) {
    errorContent = (
      <span style={{ marginTop: '5px', color: 'red', fontSize: '12px' }}>
        {errors}
      </span>
    );
  }
  switch (type) {
    case 'select':
      field = (
        <Field as="select" id={id} name={id}>
          {options.map((item, index) => (
            <option
              value={item.value}
              id={item.id}
              selected={index === 0 ? true : ''}
            >
              {item.label}
            </option>
          ))}
        </Field>
      );
      break;
    case 'textarea':
      field = <Field name={id} id={id} as="textarea" className="input_box" />;
      break;
    default:
      field = (
        <Field
          name={id}
          type={type}
          id={id}
          value={value}
          className="input_box"
        />
      );
      break;
  }
  return (
    <>
      {labelContent}
      {field}
      {errorContent}
    </>
  );
};
export default CustomField;

import "./CustomInput.css";

import { useField } from "formik";

export function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="form-floating">
      <input
        id={label}
        {...field}
        {...props}
        className={`form-control 
        ${meta.error && meta.touched && "is-invalid"}
        ${!meta.error && meta.touched && "is-valid"}`}
      />
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      {meta.error && meta.touched && (
        <div className="invalid-feedback position-absolute">{meta.error}</div>
      )}
    </div>
  );
}

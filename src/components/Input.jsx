const Input = ({ type, id, name, placeholder, value, className, onChange, minLength, maxLength, min, max, step, required = true }) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block ${className} px-3 py-2 shadow-lg rounded-lg bg-gray-200 text-gray-700 focus:ring focus:ring-opacity-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-200`}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        required={required}
      />
    </>
  );
};

export default Input;
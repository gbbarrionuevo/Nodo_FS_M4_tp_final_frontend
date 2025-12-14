const Button = ({ type, className, title = "", onClick, disabled = false, children }) => {
  return (
    <>
      <button
        type={type}
        className={`${className} cursor-pointer rounded-xl transition`}
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
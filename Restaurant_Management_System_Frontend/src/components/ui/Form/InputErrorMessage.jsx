const InputErrorMessage = ({ children = "", className = "" }) => {
  return (
    children ? (
      <span className={`block mt-1 ml-1 text-red-600 text-sm ${className}`}>
        {children}
      </span>
    ) : null
  );
};

export default InputErrorMessage;

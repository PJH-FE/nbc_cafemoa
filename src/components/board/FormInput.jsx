const FormInput = ({ type, name, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="border-black border-b-[1px] flex-1 h-9 outline-none px-2 size-4"
    />
  );
};
export default FormInput;

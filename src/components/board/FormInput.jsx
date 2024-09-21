const FormInput = ({ type, name, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="border-[#61443A] w-full border-b-[2px] flex-1 h-9 outline-none px-2 size-4 text-[20px] pb-[10px]"
      placeholder={placeholder}
    />
  );
};
export default FormInput;

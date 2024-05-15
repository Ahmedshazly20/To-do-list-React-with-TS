interface IProps {
    msg?: string;
  }
  const InputErrorMessage = ({ msg }: IProps) => {
    return msg ? (
      <span className="block mt-[5px] text-red-700 font-semibold ml-[20px] text-sm">{msg}</span>
    ) : null;
  };
  
  export default InputErrorMessage;
  
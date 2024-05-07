import { useEffect, useState } from "react";
import { Input, Popup2 } from "@/app/components/atoms";
import { UserInterface } from "@/lib/interfaces";
import { initialState as userInitialData } from "@/provider/redux/userSlice";

interface Props {
  buttonText1: string;
  onClickButton1: (data: UserInterface) => void;
  userData?: UserInterface
}


export const UserForm = ({
  buttonText1,
  onClickButton1,
  userData
}: Props) => {
  const [formData, setFormData] = useState<UserInterface>(userData || userInitialData);

  useEffect(() => {
    setFormData(userData || userInitialData) 
  }, []);
  
  console.log(userData);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClickButton1(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        required
        pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // email
        title="Please enter a valid 11-digit cedula number"
        id={""}
        bgColor={true}
      />
      <Input
        type="text"
        name="cedula"
        value={formData.document}
        onChange={handleChange}
        placeholder="Cedula"
        required
        pattern="\d{11}" // 11 digits
        title="Please enter a valid 11-digit cedula number"
        id={""}
        bgColor={true}
      />
      <Input
        type="text"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        placeholder="Gender"
        required
        id={""}
        bgColor={true}
      />
      <Input
        type="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        pattern="\d{10}" // 10 digits
        title="Please enter a valid 10-digit phone number"
        id={""}
        bgColor={true}
      />
      <Input
        type="number"
        name="age"
        value={formData.age.toString()}
        onChange={handleChange}
        placeholder="Age"
        required
        pattern="\d{18}" // 10 digits
        id={""}
        bgColor={true}
      />
      {buttonText1 && (
        <span className="absolute bottom-4 flex justify-between w-full right-0">
          <button type="submit" className=" w-full mr-2 px-4 py-2 cff-bg-color-green-600 dark:cff-bg-color-green-700 dark:text-white text-gray-500 rounded hover:bg-opacity-20">
            {buttonText1}
          </button>
        </span>
      )}
    </form>
  );
};
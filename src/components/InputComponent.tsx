import { useField } from "formik";
import { Input } from "@/components/ui/input";

export const InputComponent = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <Input {...field} {...props} />
    </>
  );
};

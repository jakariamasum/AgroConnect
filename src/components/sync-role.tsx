import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface SyncRoleFieldProps {
  userType: "buyer" | "farmer";
}

const SyncRole = ({ userType }: SyncRoleFieldProps) => {
  const { setValue, register } = useFormContext();

  useEffect(() => {
    register("role");
  }, [register]);

  useEffect(() => {
    setValue("role", userType.toUpperCase());
  }, [userType, setValue]);

  return <input type="hidden" name="role" />;
};
export default SyncRole;

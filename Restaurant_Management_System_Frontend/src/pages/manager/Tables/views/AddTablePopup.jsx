import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tableSchema } from "../../../../validation/tableSchema";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../../components/ui";
import { useManageTables } from "../../../../hooks/manager/tablesHooks";

const AddTablePopup = ({ isOpen, handleClose }) => {
  const { register, handleSubmit: formSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(tableSchema),
    mode: "onChange",
  });

  const { addTable, isAdding } = useManageTables();

  const onSubmit = (data) => {
    addTable(
      {
        tableName: data.tableName,
        capacity: parseInt(data.capacity, 10),
      },
      {
        onSuccess: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Add New Table"
      description="Please enter the table name and its capacity."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={formSubmit(onSubmit)}>
        <Field>
          <Label>Table Name</Label>
          <Input
            {...register("tableName")}
            isError={!!errors.tableName}
            type="text"
            placeholder="Table Name"
          />
          {errors.tableName && <InputErrorMessage>{errors.tableName.message}</InputErrorMessage>}
        </Field>

        <Field>
          <Label>Capacity</Label>
          <Input
            {...register("capacity")}
            isError={!!errors.capacity}
            type="number"
            placeholder="Table Capacity"
          />
          {errors.capacity && <InputErrorMessage>{errors.capacity.message}</InputErrorMessage>}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth={true} isLoading={isAdding}>
            Add
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default AddTablePopup;

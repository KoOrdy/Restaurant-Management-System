import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Field, Input, InputErrorMessage, Label, Popup } from "../../../components/ui";
import { useManageReservations } from "../../../hooks/customer/useReservationHook";
import { makeReservationSchema } from "../../../validation/makeReservationSchema";

const MakeReservationPopup = ({ isOpen, handleClose, restaurantId, table }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(makeReservationSchema),
    mode: "onChange",
  });


  const { makeReservation, isMaking } = useManageReservations();

  const onSubmit = (data) => {
    console.log(data);
    makeReservation(
      { restaurantID: restaurantId, data }, // this matches your mutationFn signature
      {
        onSuccess: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  // Set tableId when popup opens
  useEffect(() => {
    if (table?.id) {
      setValue("tableId", table.id);
    }
  }, [table, setValue]);

  return (
    <Popup
      isOpen={isOpen}
      closeModal={handleClose}
      title="Make a Reservation"
      description="Please provide reservation details."
    >
      <form className="flex flex-col space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="hidden">
          <Field>
            <Label>Table ID</Label>
            <Input
              {...register("tableId")}
              type="number"
              readOnly
              placeholder="Table ID"
              isError={!!errors["tableId"]}
            />
            {errors.tableId && <InputErrorMessage>{errors.tableId.message}</InputErrorMessage>}
          </Field>
        </div>

        <Field>
          <Label>Reservation Date</Label>
          <Input
            {...register("reservationDate")}
            type="date"
            placeholder="Reservation Date"
            isError={!!errors["reservationDate"]}
          />
          {errors.reservationDate && (
            <InputErrorMessage>{errors.reservationDate.message}</InputErrorMessage>
          )}
        </Field>

        <Field>
          <Label>Start Time</Label>
          <Input
            {...register("startTime")}
            type="time"
            placeholder="Start Time"
            isError={!!errors["startTime"]}
          />
          {errors.startTime && (
            <InputErrorMessage>{errors.startTime.message}</InputErrorMessage>
          )}
        </Field>

        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" fullWidth={true} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" fullWidth={true} isLoading={isMaking}>
            Reserve
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default MakeReservationPopup;

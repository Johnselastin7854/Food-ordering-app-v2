import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurantRequest,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-resturant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restuarantData } = useGetMyRestaurant();
  const { updateRestaurantData, isLoading: isUpdateLoading } =
    useUpdateMyRestaurantRequest();

  const isEditing = !!restuarantData;
  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurantData : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurant={restuarantData}
    />
  );
};

export default ManageRestaurantPage;

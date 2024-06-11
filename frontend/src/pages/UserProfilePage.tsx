import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { userData, isLoading: getLoading } = useGetUser();
  const { updateUser, isLoading: updateLoading } = useUpdateUser();

  if (getLoading) {
    return <span>Loading...</span>;
  }

  if (!userData) {
    return <span>Unable to Load User Profile</span>;
  }
  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={updateLoading}
      userData={userData}
    />
  );
};

export default UserProfilePage;

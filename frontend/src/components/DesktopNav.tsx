import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import DesktopNavLinks from "./DesktopNavLinks";

const DesktopNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <DesktopNavLinks />
      ) : (
        <Button
          className="font-bold bg-orange-500 hover:bg-white hover:text-orange-500"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default DesktopNav;

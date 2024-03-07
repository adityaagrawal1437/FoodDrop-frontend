import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
        <Link to='/order-status' className="font-bold hover:text-red-500">
          My Orders
        </Link>
        <UserMenu />
        </>
        
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-red-500 hover:bg-white text-xl"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};
export default MainNav;

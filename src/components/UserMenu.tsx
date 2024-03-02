import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { DropdownMenuContent } from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const UserMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2">
        <CircleUserRound />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-center py-2">
          <Link to="/user-profile" className="font-semibold hover:text-red-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="text-center py-2">
          <Link
            to="/manage-restaurant"
            className="font-semibold hover:text-red-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="py-2">
          <Button
            onClick={() => logout()}
            className=" mx-auto flex flex-1 font-semibold bg-red-500 "
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;

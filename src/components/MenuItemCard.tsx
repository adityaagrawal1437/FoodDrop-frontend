import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCard: () => void;
};

const MenuItemCard = ({ menuItem, addToCard }: Props) => {
  return (
    <Card className=" cursor-pointer" onClick={addToCard}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ₹{(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};
export default MenuItemCard;

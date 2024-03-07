import { CardItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash2 } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cardItems: CardItem[];
  removeFromCard: (cardItem: CardItem) => void;
};
const OrderSummary = ({ restaurant, cardItems, removeFromCard }: Props) => {
  const getTotalCost = () => {
    const totalinPaisa = cardItems.reduce(
      (total, cardItems) => total + cardItems.price * cardItems.quantity,
      0
    );
    const totalWithDelivery = (
      (totalinPaisa + restaurant.deliveryPrice) /
      100
    ).toFixed(2);
    return totalWithDelivery;
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cardItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash2 className="cursor-pointer text-red-500" onClick={()=>removeFromCard(item)} />
              ₹{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;

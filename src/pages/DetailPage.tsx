import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/SearchRestaurantApi";
import { CheckoutButton } from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItemCard";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CardItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cardItems, setCardItems] = useState<CardItem[]>(() => {
    const storedCardItems = sessionStorage.getItem(`cardItems-${restaurantId}`);
    console.log(storedCardItems);
    return storedCardItems ? JSON.parse(storedCardItems) : [];
  });

  const addToCard = (menuItem: MenuItem) => {
    setCardItems((prevCardItems) => {
      const existingCardItem = prevCardItems.find(
        (cardItem) => cardItem._id === menuItem._id
      );
      let updatedCardItems;
      if (existingCardItem) {
        updatedCardItems = prevCardItems.map((cardItem) =>
          cardItem._id === menuItem._id
            ? { ...cardItem, quantity: cardItem.quantity + 1 }
            : cardItem
        );
      } else {
        updatedCardItems = [
          ...prevCardItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cardItems-${restaurantId}`,
        JSON.stringify(updatedCardItems)
      );
      return updatedCardItems;
    });
  };

  const removeFormCard = (cardItem: CardItem) => {
    setCardItems((prevCardItems) => {
      const updatedCardItems = prevCardItems.filter(
        (item) => cardItem._id !== item._id
      );
      sessionStorage.setItem(
        `cardItems-${restaurantId}`,
        JSON.stringify(updatedCardItems)
      );
      return updatedCardItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }
    const checkoutData = {
      cardItems: cardItems.map((cardItem) => ({
        menuItemId: cardItem._id,
        name: cardItem.name,
        quantity: cardItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight text-red-500">
            Menu Items
          </span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemCard
              menuItem={menuItem}
              addToCard={() => addToCard(menuItem)}
            />
          ))}
        </div>
        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cardItems={cardItems}
              removeFromCard={removeFormCard}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cardItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

import {
    IconBrandFacebook,
  IconBrandInstagram,
  IconHeart,
  IconHome,
  IconShoppingBag,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

export function HomeDock() {
  
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Products",
      icon: (
        <IconShoppingBag className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/all-products",
    },
    {
      title: "Favorites",
      icon: (
        <IconHeart className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/favorites",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/updatefashion.co/",
    },
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com/updatefashion.co.in/",
    },
  ];
  return (

    // <div className="flex fixed z-[9999999]  bottom-6 items-center justify-center portrait:justify-end portrait:pr-6 portrait:items-end  w-full mx-auto">
      <FloatingDock
        items={links}
        />
    // </div>
  );
}

import { css } from "@emotion/react";
import tw from "twin.macro";

export const useDrawerStyles = () => {
  return {
    transparentBg: (open: boolean) => css`
      ${tw`md:hidden fixed inset-0 max-h-screen z-[999] bg-greyScale-dark/50`}
      ${open ? tw`block` : tw`hidden`}
    `,
    drawerWrapper: css`
      ${tw`bg-white text-greyScale-main shadow-sm z-[999] w-[256px] max-w-[256px] h-screen overflow-hidden  md:relative fixed`}
    `,
    logo: css`
      ${tw`border-b border-greyScale-light py-x-small mx-x-small flex justify-end`}
    `, 
    drawerIcon: css`
      ${tw`min-w-max w-5 h-5`}
    `,
    subMenuArrowIcon: (open: boolean) => css`
      ${tw`w-3 h-3 duration-300`}
      ${open && tw`rotate-180`}
    `,
    subMenu: css`
      ${tw`flex flex-col pr-xx-large text-medium text-greyScale-main overflow-hidden h-0`}
    `,
    subMenuWrapper: css`
      ${tw`flex flex-col gap-1`}
    `,
    menus: css`
      ${tw`whitespace-pre px-small py-3 flex flex-col gap-1 overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-greyScale-lighter h-[90%] text-large`}
    `,
    menusWrapper: css`
      ${tw`flex flex-col h-full`}
    `,
  };
};

import React from "react";

type Props = {
  setIsMenuVisible: (isMenuVisible: boolean) => void;
  isMenuVisible: boolean;
};

const MenuButton = ({ setIsMenuVisible, isMenuVisible }: Props) => {
  const toggleActive = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="pl-4">
      <div className="hover:cursor-pointer" onClick={toggleActive}>
        <span
          className={`w-[40px]
                     h-[5px]
                     bg-[#D29538]
                     block
                     my-2
                     mx-auto
                     transition-all
                     duration-300
                     ease-in-out
                     ${isMenuVisible && "translate-y-3 rotate-45"}`}
        ></span>
        <span
          className={`w-[40px]
                     h-[5px]
                     bg-[#D29538]
                     block
                     my-2
                     mx-auto
                     transition-all
                     duration-300
                     ease-in-out
                     ${isMenuVisible && "opacity-0"}`}
        ></span>
        <span
          className={`w-[40px]
                     h-[5px]
                     bg-[#D29538]
                     block
                     my-2
                     mx-auto
                     transition-all
                     duration-300
                     ease-in-out
                     ${isMenuVisible && "translate-y-[-13px] rotate-[-45deg]"}`}
        ></span>
      </div>
    </div>
  );
};

export default MenuButton;

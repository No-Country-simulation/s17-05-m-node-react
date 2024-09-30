import { CamIcon } from "@/svg/CamIcon";
import { useRef } from "react";

type Props = {
  image: string;
  setImage: (value: string) => void;
};

export const AvatarUploader = ({ image, setImage }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div
          className="w-32 h-32
                     rounded-full
                     bg-[#eeeeee]"
        >
          <img
            src={image}
            alt="Foto de perfil"
            className="w-32 h-32
                       rounded-full
                       object-cover
                       cursor-pointer"
            onClick={handleImageClick}
          />
        </div>
        <div
          className="absolute
                     bottom-0
                     right-0
                     bg-[#CDCDCD]
                     rounded-full
                     p-2
                     cursor-pointer"
          onClick={handleImageClick}
        >
          <div className="text-gray-600">
            <CamIcon />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  );
};

import { ValidationRuleI } from "@/types/generalTypes";

type Props = {
  validationRules?: ValidationRuleI[];
};

export const ErrorMessage = ({ validationRules }: Props) => {
  return (
    <>
      {validationRules?.find((rule) => rule.condition) && (
        <div
          className="text-[#FF0000]
                     text-xs bottom-0
                     left-0
                     font-[400]
                     md:text-sm
                     h-[30px]"
        >
          {validationRules?.find((rule) => rule.condition)?.message}
        </div>
      )}
    </>
  );
};

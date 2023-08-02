import { FC, HTMLAttributes, ReactNode } from "react";
import TextBadge, { BadgeStatus } from "../Badge/TextBadge";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
  subtitle?: string;
  category?: string;
  photoAlt: string;
  photoSrc: string;
  action?: ReactNode;
  inactive?: boolean;
}
const MedicineCard: FC<Props> = ({
  name,
  subtitle,
  category,
  photoAlt,
  photoSrc,
  action,
  inactive,
  className,
  ...rest
}) => {
  return (
    <div
      className={`${
        inactive ? "bg-white" : "bg-greyScale-lighter"
      } flex flex-col sm:flex-row justify-between gap-small break-all  items-center p-large rounded-med my-small ${className}`}
    >
      <div className="flex items-center gap-3" {...rest}>
        <img alt={photoAlt} src={photoSrc} width={60} height={60} />
        <span>
          <div className="flex gap-2">
            <p className="text-large text-greyScale-main font-semibold break-words hyphens-auto">
              {name}
            </p>
            {category && (
              <TextBadge title={category} status={BadgeStatus.SUCCESS} />
            )}
          </div>
          <p className="text-large text-greyScale-light">{subtitle}</p>
        </span>
      </div>
      {action}
    </div>
  );
};

export default MedicineCard;

import { FC, ReactNode } from "react";
import IconBadge from "../Badge/IconBadge";
import { EnvelopeOpenFill, TelephoneFill } from "react-bootstrap-icons";
import { BadgeStatus } from "../Badge/TextBadge";

interface Props {
  flag?: ReactNode;
  title: string;
  subTitle: string;
  date?: string;
  email: string;
  phone: string;
  action?: ReactNode;
  inactive?: boolean;
  handleActive?: () => void;
}
const DestinationCard: FC<Props> = ({
  flag,
  title,
  subTitle,
  email,
  phone,
  date,
  inactive,
  action,
  handleActive,
}) => {
  return (
    <div
      className={`p-large h-fit min-h-max break-words min-w-min ${
        inactive ? "bg-white" : "bg-greyScale-lighter"
      } hover:bg-greyScale-lighter ${
        handleActive && "cursor-pointer"
      } rounded-med`}
      onClick={handleActive && handleActive}
    >
      {flag && <span className="flex items-center justify-end">{flag}</span>}
      <span className="flex items-center justify-between">
        <p className="text-x-large text-greyScale-main">{title}</p>
        {date && <p className="text-medium text-green-main">{date}</p>}
      </span>
      <p className="w-full text-medium text-greyScale-light">{subTitle}</p>
      <span className="flex items-center ">
        <IconBadge icon={<EnvelopeOpenFill />} status={BadgeStatus.BASE} />
        <div className="m-small">
          <p className="text-greyScale-light text-small">الايميل</p>
          <p className="text-greyScale-main text-large">{email}</p>
        </div>
      </span>
      <span className="flex items-center">
        <IconBadge icon={<TelephoneFill />} status={BadgeStatus.BASE} />
        <div className="m-small">
          <p className="text-greyScale-light text-small">رقم الهاتف</p>
          <p className="text-greyScale-main text-large">{phone}</p>
        </div>
      </span>
      {!inactive && action && (
        <span className="flex items-center justify-end gap-small">
          {action}
        </span>
      )}
    </div>
  );
};

export default DestinationCard;

import { XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import { FC } from "react";
import { storesData } from "../../../Schema/response/Store.schema";
import { medicines } from "../../../Schema/response/medicine.schema";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";
import IconBadge from "../../../components/Badge/IconBadge";
import { BadgeStatus } from "../../../components/Badge/TextBadge";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const OrderOverView: FC<Props> = ({ open, handleOpen }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] h-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large flex items-center justify-between  text-greyscale-main text-xx-large border-solid border-b border-greyScale-light">
              تجميع الطلب من المخازن
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-medium py-medium flex-1 items-center overflow-auto scrollbar-thin">
              <div className="rounded-med flex flex-col shadow-sm flex-1 w-full p-medium">
                <p className="text-large text-greyScale-dark">
                  {storesData[0].name}
                </p>
                <MedicineCard
                  key={1}
                  name={medicines[0].name}
                  photoAlt={medicines[0].name}
                  photoSrc={medicines[0].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
              </div>
              <div className="rounded-med flex flex-col shadow-sm flex-1 w-full p-medium">
                <p className="text-large text-greyScale-dark">
                  {storesData[1].name}
                </p>
                <MedicineCard
                  key={1}
                  name={medicines[0].name}
                  photoAlt={medicines[0].name}
                  photoSrc={medicines[0].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
                <MedicineCard
                  key={1}
                  name={medicines[1].name}
                  photoAlt={medicines[1].name}
                  photoSrc={medicines[1].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
                <MedicineCard
                  key={1}
                  name={medicines[0].name}
                  photoAlt={medicines[0].name}
                  photoSrc={medicines[0].photo}
                  action={
                    <IconBadge
                      icon={<p className="font-bold text-xx-large">x5</p>}
                      status={BadgeStatus.WARNING}
                    />
                  }
                />
              </div>
            </div>
            <div className="p-medium flex justify-center">
              <Button
                text="حسناً"
                variant="base-blue"
                disabled={false}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderOverView;

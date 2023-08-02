import { FC, useRef, useState } from "react";
import { Upload, XSquareFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import { DropdownProvider } from "../../../components/Dropdown/context";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DropdownMenu from "../../../components/Dropdown/DropdownMenu";
import DropdownItem from "../../../components/Dropdown/DropdownItem";
import { rows } from "../../../Schema/response/Store.schema";
import { suppliers } from "../../../Schema/response/Suppliers.schema";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const AddMedicine: FC<Props> = ({ open, handleOpen }) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const fileRef = useRef<any>();
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log(selectedImage);
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center max-h-screen z-[999] bg-greyScale-dark/50">
          <div className="w-[235px] sm:w-[435px] flex flex-col rounded-small bg-white">
            <p className="p-x-large   text-greyscale-main text-xx-large border-solid border-b border-greyScale-light flex justify-between items-center">
              دواء جديد
              <XSquareFill
                className="text-greyScale-light hover:text-primary-main transition-colors duration-300 ease-in"
                onClick={handleOpen}
              />
            </p>
            <div className="flex flex-col gap-small px-medium py-medium flex-1 overflow-auto scrollbar-thin">
              <form
                className="flex gap-3 flex-col sm:flex-row items-center sm:items-start"
                onSubmit={(e: any) => e.preventDefault()}
              >
                <span
                  className="bg-primary-light w-28 h-28 rounded-med flex flex-col justify-center items-center"
                  onClick={() => fileRef.current.click()}
                >
                  <Upload className="text-primary-main w-6 h-6" />
                  <p className="text-primary-main font-bold">إضافة صورة</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                    multiple={false}
                  />
                </span>
                <span className="flex-1 flex flex-col gap-medium">
                  <TextField placeholder="اسم الدواء" inputSize="x-large" />
                  <DropdownProvider title="الفئة العلاجية">
                    <Dropdown>
                      <DropdownMenu>
                        {rows.map((store) => (
                          <DropdownItem key={store.id} title={store.name} />
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownProvider>
                  <DropdownProvider title="الشركة المورّدة">
                    <Dropdown>
                      <DropdownMenu>
                        {suppliers.map((supplier) => (
                          <DropdownItem
                            key={supplier.id}
                            title={supplier.name}
                          />
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownProvider>
                  <span className="flex gap-medium">
                    <TextField placeholder="رقم الدفعة" inputSize="x-large" />
                    <TextField
                      endIcon={<p className="pr-x-small border-r">علبة</p>}
                      placeholder="الكمية"
                      inputSize="x-large"
                    />
                  </span>
                  <span className="flex gap-medium">
                    <TextField
                      endIcon={<p className="pr-x-small border-r">ل.س</p>}
                      placeholder="سعر الشراء"
                      inputSize="x-large"
                    />
                    <TextField
                      endIcon={<p className="pr-x-small border-r">ل.س</p>}
                      placeholder="سعر المبيع"
                      inputSize="x-large"
                    />
                  </span>
                  <p className="text-greyScale-main">تخزين الدواء:</p>
                  <DropdownProvider title="المخزن">
                    <Dropdown>
                      <DropdownMenu>
                        {rows.map((store) => (
                          <DropdownItem key={store.id} title={store.name} />
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownProvider>
                </span>
              </form>
            </div>
            <div className="p-medium flex justify-center">
              <Button
                text="إضافة"
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

export default AddMedicine;

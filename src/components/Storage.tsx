import { Progress, Listbox, ListboxItem } from "@nextui-org/react";
import { useDriveStorage, useFolderSize } from "../utils/useDriveStorage";
import { humanFileSize } from "../utils/fileDetails";
import { BsApple, BsHddFill } from "react-icons/bs";
import { TbApps, TbDeviceGamepad2 } from "react-icons/tb";
import { useState } from "react";
import Popover from "./UI/Popover";
import { GoChevronDown } from "react-icons/go";

const Storage = ({ token }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const { quota } = useDriveStorage(token);
  const Apps = "RDRIVE/Apps";
  const Apple = "RDRIVE/Apple";
  const Games = "RDRIVE/Games";
  const { folderSize: folderSize1, } = useFolderSize(token, Apps);
  const { folderSize: folderSize2, } = useFolderSize(token, Apple);
  const { folderSize: folderSize3, } = useFolderSize(token, Games);

  return (
    <Popover
        content={
          <Listbox variant="faded" aria-label="Storage Details" key="Storage Details" className="w-full md:w-80 gap-2 my-1">
        <ListboxItem key="Apps (F:)" >
           <div>
            <div className="flex items-center my-2 justify-between">
              <p className="flex items-center gap-2 tracking-wider">
                <TbApps size={24} /> Apps (F:)
              </p>
              <h1>
                {humanFileSize(folderSize1)}{" "}
                <span className="text-sm">used</span>
              </h1>
            </div>
            <Progress
              size="md"
              value={(folderSize1)}
              maxValue={10000000000000} />
          </div>
        </ListboxItem>
        <ListboxItem
          key="Apple (E:)"
        >
         <div>
            <div className="flex items-center my-2 justify-between ">
              <p className="flex items-center gap-2 tracking-wider">
                <BsApple size={24} /> Apple (E:)
              </p>
              <h1>
                {humanFileSize(folderSize2)}{" "}
                <span className="text-sm">used</span>
              </h1>
            </div>
            <Progress
              size="md"
              value={(folderSize2)}
              maxValue={10000000000000} />
          </div>
        </ListboxItem>
        <ListboxItem key="Games (D:)" >
           <div>
            <div className="flex items-center my-2 justify-between">
              <p className="flex items-center gap-2 tracking-wider">
                <TbDeviceGamepad2 size={24} /> Games (D:)
              </p>
              <h1>
                {humanFileSize(folderSize3)}{" "}
                <span className="text-sm">used</span>
              </h1>
            </div>
            <Progress
              size="md"
              value={(folderSize1)}
              // HAHA
              maxValue={1000000000000000000} />
          </div>
        </ListboxItem>
        <ListboxItem
          key="RDRIVE (C:)"
        >
            <div>
            <div className="flex items-center my-2 justify-between">
              <p className="flex items-center gap-2 tracking-wider">
                <BsHddFill size={24} /> RDRIVE (C:)
              </p>
              <h1>
                {humanFileSize(quota.used)} {" "}
                <span className="text-sm">used</span>
              </h1>
            </div>
            <Progress
              size="md"
              color="success"
              value={quota.percentageUsed} />
            <h1 className="text-sm ml-1 mt-1 tracking-wider">
              {humanFileSize(quota.remaining)} free of {" "}
              <span className=" ">
                {humanFileSize(quota.total)}
              </span>
            </h1>
          </div>
        </ListboxItem>
        </Listbox>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button className="flex items-center gap-1" onClick={() => setOpenPopover(!openPopover)}>
            Storage <GoChevronDown className={`h-4 w-4 transition-transform transform ${openPopover ? "rotate-180" :''}`} />
          </button>
    </Popover>
  );
};

export default Storage;
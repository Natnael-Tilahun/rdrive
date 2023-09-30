import { Progress, Listbox, ListboxItem } from "@nextui-org/react";
import { useDriveStorage, useFolderSize } from "../utils/useDriveStorage";
import { humanFileSize } from "../utils/fileDetails";
import { BsApple, BsHddFill } from "react-icons/bs";
import { TbApps, TbDeviceGamepad2 } from "react-icons/tb";
import { LinkPopover } from "./UI/LinkPopover";

const Storage = ({ token }) => {
  const { quota } = useDriveStorage(token);
  const Apps = "RDRIVE/Apps";
  const Apple = "RDRIVE/Apple";
  const Games = "RDRIVE/Games";
  const { folderSize: folderSize1, } = useFolderSize(token, Apps);
  const { folderSize: folderSize2, } = useFolderSize(token, Apple);
  const { folderSize: folderSize3, } = useFolderSize(token, Games);

  return (
    <LinkPopover
     open="Storage"
      content={ 
        <Listbox variant="faded" aria-label="Storage Details" key="Storage Details" className="w-full md:w-80 gap-2 my-1">
        <ListboxItem key="Apps (F:)" >
           <div>
            <div className="flex items-center my-2 justify-between">
              <p className="flex items-center gap-2 tracking-wider">
                <TbApps size={24} /> Apps (E:)
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
        <ListboxItem key="Games (E:)" >
           <div>
            <div className="flex items-center my-2 justify-between">
              <p className="flex items-center gap-2 tracking-wider">
                <TbDeviceGamepad2 size={24} /> Games (F:)
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
          key="Apple (D:)"
        >
         <div>
            <div className="flex items-center my-2 justify-between ">
              <p className="flex items-center gap-2 tracking-wider">
                <BsApple size={24} /> Apple (D:)
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
    />
  );
};

export default Storage;
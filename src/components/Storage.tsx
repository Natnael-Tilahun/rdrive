import { Divider, Progress, Button } from "@nextui-org/react";
import { useDriveStorage, useFolderSize } from "../utils/useDriveStorage";
import { humanFileSize } from "../utils/fileDetails";
import { BsApple, BsHddFill } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import Popover from "./UI/Popover";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

const Storage = ({ token }) => {

  const { quota } = useDriveStorage(token);
  const [openPopover, setOpenPopover] = useState(false);

  const Apps = "RDRIVE/Apps";
  const Apple = "RDRIVE/Apple";
  // const Games = "RDRIVE/Games";
  const { folderSize: folderSize1, } = useFolderSize(token, Apps);
  const { folderSize: folderSize2, } = useFolderSize(token, Apple);
  // const { folderSize: folderSize3, } = useFolderSize(token, Games);

  return (
    <Popover
      content={
      <div className="w-full md:w-80 p-2">
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
          <Divider className="my-3 dark:bg-gray-700" />
          {/*Apple */}
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
          <Divider className="my-4 dark:bg-gray-700" />
          {/*Apps */}
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
          <Divider className="mt-4 dark:bg-gray-700" />
          {/* Games
              <div>
                <div className="flex items-center my-2 justify-between">
                    <p className="flex items-center gap-2 tracking-wider">
                    <TbDeviceGamepad2 size={24}/> Apps (F:)
                    </p>
                    <h1>
                    {humanFileSize(folderSize3)}{" "}
                      <span className="text-sm">used</span>
                    </h1>
                </div>
                    <Progress
                      size="md"
                      value={(folderSize1)}
                      maxValue={10000000000000}
                    />
              </div>
              <Divider className="mt-4 dark:bg-gray-700" /> */}
      </div>}
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button className="flex items-center gap-1" onClick={() => setOpenPopover(!openPopover)}>Storage <GoChevronDown className={`h-4 w-4 transition-all ${openPopover ? "rotate-180" : ""}`} /></button>
    </Popover>
  );
};

export default Storage;
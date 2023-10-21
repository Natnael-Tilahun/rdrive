import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { BsAndroid2, BsApple, BsGooglePlay, BsWindows } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbApps, TbDeviceGamepad2 } from "react-icons/tb";
import { FaAppStoreIos, FaLinux } from "react-icons/fa";

function getPathValue(asPath) {
  const segments = asPath.split("/").filter(Boolean).map(segment => segment.toLowerCase());
  const firstSegment = segments[0];

  if (firstSegment === "apps") {
    return "Apps";
  } else if (firstSegment === "apple" || firstSegment === "icloud") {
    return "Apple";
  } else if (firstSegment === "games") {
    return "Games";
  } else {
    return "Android";
  }
}

export default function Bar() {
  const router = useRouter();
  const { asPath } = router;
  const [selected, setSelected] = useState(getPathValue(asPath));

  useEffect(() => {
    setSelected(getPathValue(asPath));
  }, [asPath]);

  let appsTab = {
    id: "Apps",
    label: "Apps",
    link: "/Apps",
    icon: <TbApps size={22} />,
  };

  let gamesTab = {
    id: "Games",
    label: "Games",
    link: "/Games",
    icon: <TbDeviceGamepad2 size={22} />,
  };
  
  const segments = asPath.split("/").filter(Boolean).map(segment => segment.toLowerCase());

  if (segments[0] === "apps") {
    if (segments[1] === "mac-os") {
      appsTab.icon = <FaAppStoreIos size={22} />;
    } else if (segments[1] === "linux") {
      appsTab.icon = <FaLinux size={22} />;
    } else if (segments[1] === "windows") {
      appsTab.icon = <BsWindows size={22} />;
    } else if (segments[1] === "android") {
      appsTab.icon = <BsGooglePlay size={22} />;
    }
  } else if (segments[0] === "games") {
    if (segments[1] === "mac-os") {
      gamesTab.icon = <FaAppStoreIos size={22} />;
    } else if (segments[1] === "linux") {
      gamesTab.icon = <FaLinux size={22} />;
    } else if (segments[1] === "windows") {
      gamesTab.icon = <BsWindows size={22} />;
    } else if (segments[1] === "android") {
      gamesTab.icon = <BsGooglePlay size={22} />;
    }
  }

  let tabs = [
    {
      id: "Android",
      label: "Android",
      link: "/",
      icon: <BsAndroid2 size={22} />,
    },
    appsTab,
    gamesTab,
    {
      id: "Apple",
      label: "Apple",
      link: "/Apple",
      icon: <BsApple size={22} />,
    },
  ];

  return (
    <div className="fixed bottom-3 md:bottom-2 z-30">
      <div className="justify-center flex w-full">
        <Tabs
          aria-label="Menu Bar"
          size="lg"
          radius="md"
          items={tabs}
          selectedKey={selected}
          classNames={{
            tab: "h-full",
            tabList: "h-16 bg-white dark:bg-black border dark:border-gray-700 overflow-hidden",
            cursor: "bg-gradient-to-t dark:from-[#0D1117] dark:to-gray-850 overflow-hidden",
            tabContent: "dark:group-data-[selected=true]:text-white text-black dark:text-white",
          }}
        >
          {(item) => (
            <Tab
              key={item.id}
              title={
                <Link href={item.link} passHref>
                  <div className="justify-center text-center flex flex-col items-center">
                    {item.icon}
                    {item.label}
                  </div>
                </Link>
              }
            />
          )}
        </Tabs>
      </div>
    </div>
  );
}


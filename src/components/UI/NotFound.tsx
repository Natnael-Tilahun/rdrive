import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@nextui-org/react";
import { GoSearch } from "react-icons/go";
import { Slash } from "../icons";
import { Opps } from "../../utils/LottieUrl";

const NotFound = () => {
    return (
      <div className="justify-center">
        <div className="m-auto flex flex-col items-center text-center md:mt-24">
          <Player autoplay loop src={Opps} style={{ height: '300px' }}></Player>
          <p className="text-2xl md:text-5xl lg:text-5xl text-gray-800 dark:text-white">
            Oops! That page can’t be found.
          </p>
          <p className="md:text-lg lg:text-xl text-gray-600 dark:text-white mt-4">
            It looks like nothing was found at this location. Maybe try a search?
          </p>
          <div className="mt-4 mb-12">
            <Button
              disabled
              className="bg-transparent border dark:border-gray-700 overflow-hidden font-sans dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850"
              radius="md"
            >
              <GoSearch size={20} />
              Type
              <Slash />
              to search
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default NotFound;
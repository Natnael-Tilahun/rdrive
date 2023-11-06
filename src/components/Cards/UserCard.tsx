import React, { useEffect, useState } from "react";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { fetchGitHubUser } from '../../utils/githubApi';
import Hover from "../UI/Tooltip";
import { UserLink, X } from "../icons";
import { BsGithub } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { UserData } from "../../types";


export const UserCard = ({ username }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGitHubUser(username);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching GitHub user:', error);
      }
    };

    fetchData();
  }, [username]);

  if (!userData) {
    return null;
  }

  return (
    <Card shadow="none" className="w-full md:w-80 border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar className="bg-gray-200 dark:bg-gray-700" src={userData?.avatar_url} alt={userData?.login} size="lg" />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-lg font-semibold leading-none text-black dark:text-white">
              {userData?.name || ''}
            </h4>
            <Link href={`https://github.com/${userData?.login}`} target="_blank" aria-label={userData?.login}>
              <h5 className="text-base tracking-tight text-default-500 dark:text-gray-400">@{userData?.login}</h5>
            </Link>
          </div>
        </div>
        <Link href={`https://github.com/${userData.login}`} target="_blank">
          <BsGithub size={30} />
        </Link>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-base text-default-500 dark:text-gray-200">
          {userData?.bio || 'Sorry, it appears that my GitHub bio is on a coffee break! ☕️'}
        </p>
      </CardBody>
      <CardFooter className="gap-3 text-default-foreground justify-between">
        <div className="flex items-center space-x-2">
          <FiUsers size={20} />
          <div className="flex gap-1">
            <p className="font-semibold text-base">{userData?.followers}</p>
            <p className="text-base">Followers</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {userData?.twitter_username && (
            <Hover tipChildren="Follow on X">
              <Link href={`https://twitter.com/${userData.twitter_username}`} target="_blank">
                <X />
              </Link>
            </Hover>
          )}
          {userData?.blog && (
            <Hover tipChildren="Visit Profile">
              <Link href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`} target="_blank">
                <UserLink />
              </Link>
            </Hover>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

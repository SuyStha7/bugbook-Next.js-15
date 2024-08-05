"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { UserData } from "@/lib/types";
import { FollowerInfo } from "@/lib/utils";
import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import Linkify from "./Linkify";
import FollowerCount from "./FollowerCount";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export default function UserTooltip({ user, children }: UserTooltipProps) {
  const { user: loggedInUser } = useSession();
  const followerState: FollowerInfo = {
    followers: user?._count?.followers || 0,
    isFollowedByUser: !!user?.followers?.some(
      ({ followerId }) => followerId === loggedInUser.id,
    ),
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/users/${user.username}`}>
                <UserAvatar avatarUrl={user.avatarUrl} size={70} />
              </Link>
              {loggedInUser.id !== user.id && (
                <FollowButton userId={user.id} initialState={followerState} />
              )}
            </div>
            <div className="">
              <Link href={`/users/${user.username}`}>
                <div className="text-lg font-semibold hover:underline">
                  {user.displayName}
                </div>
              </Link>
              <div className="text-muted-foreground">@{user.username}</div>
            </div>
            {user.bio && (
              <Linkify>
                <div className="whitespace-ypre-line line-clamp-4">
                  {user.bio}
                </div>
              </Linkify>
            )}
            <FollowerCount userId={user.id} initialState={followerState} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

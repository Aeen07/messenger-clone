"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FullConversationType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import SettingsModal from "@/app/components/sidebar/SettingsModal";

interface UserListProps {
  items: User[];
  conversations: FullConversationType[];
  currentUser: User;
}

const UserList: React.FC<UserListProps> = ({
  items,
  conversations,
  currentUser,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <aside
        className="
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
      block
      w-full
      left-0"
      >
        <div className="px-5">
          <div className="flex flex-row justify-between">
            <div
              className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    py-4"
            >
              People
            </div>
            <nav
              className="
                mt-4
                flex
                flex-col
                justify-between
                items-center"
            >
              <div
                onClick={() => setIsSettingsOpen(true)}
                className="
                  cursor-pointer
                  hover:opacity-75
                  transition
                  lg:hidden"
              >
                <Avatar user={currentUser} />
              </div>
            </nav>
          </div>
          <div
            className="
          justify-between
          pb-10
          pt-3"
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div
                className="
              flex
              relative 
              items-center
              text-gray-400
              focus-within:text-gray-600"
              >
                <AiOutlineSearch
                  size={25}
                  className="absolute ml-3 pointer-events-none"
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search for people"
                  autoComplete="off"
                  aria-aria-label="Search for people"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="
                  pr-3
                  pl-12
                  py-2
                  font-semibold
                  placeholder-gray-500
                  text-black
                  rounded-2xl
                  border-none
                  ring-2
                  w-full
                  ring-gray-300
                  focus:ring-gray-500
                  focus:ring-2"
                />
              </div>
            </form>
          </div>
          {items.map((item) =>
            item.name === searchItem ? (
              <UserBox key={item.id} data={item} />
            ) : null
          )}
          {conversations.map((conv) => (
            <UserBox
              key={
                conv.users[conv.users.findIndex((e) => e.id !== currentUser.id)]
                  .id
              }
              data={
                conv.users[conv.users.findIndex((e) => e.id !== currentUser.id)]
              }
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default UserList;

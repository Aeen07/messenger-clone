"use client";

import Modal from "@/app/components/Modal";
import useActiveList from "@/app/hooks/useActiveList";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  user: User;
}

const ProfileModal: React.FC<ImageModalProps> = ({ isOpen, onClose, user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  const statusText = useMemo(() => {
    return isActive ? "Active" : "Offline";
  }, [isActive]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <table
        className="
      w-full
      border-spacing-0
      flex
      flex-col"
      >
        <div className="relative">
          <div
            className="
          pt-[1.1rem]
          px-[3.2rem]
          pb-[1.6rem]
          items-center
          bg-white
          cursor-auto
          flex
          m-0
          relative"
          >
            <Image
              width={54}
              height={54}
              src={user?.image || "/images/placeholder.jpg"}
              className="rounded-full"
              alt="Avatar"
            />
            <div
              className="
            ml-[1.5rem]
            overflow-hidden"
            >
              <p
                className="
              font-medium
              text-md
              overflow-hidden
              overflow-ellipsis
              whitespace-nowrap
              text-gray-900
              m-0"
              >
                {user.name}
              </p>
              <p
                className={clsx(
                  `
              text-[13px]
              leading-5
              text-gray-500
              m-0
              `,
                  isActive && "text-green-500"
                )}
              >
                {statusText}
              </p>
            </div>
          </div>
        </div>
        <ul
          className="
        pl-[3.2rem]
        pr:[1.2rem]
        pt-[1.2rem]
        m-0
        list-none
        flex
        flex-col
        items-start
        border-b
        border-b-solid
        border-gray-900/10"
        >
          <li className="select-none cursor-pointer pb-[1.6rem]">
            <p
              className="
            text-sm
            font-medium  
            text-gray-500   
            sm:w-40   
            sm:flex-shrink-0"
            >
              Email
            </p>
            <div className="!select-text">
              <span className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {user.email}
              </span>
            </div>
          </li>
          <li className="select-none cursor-pointer pb-[1.6rem]">
            <p
              className="
            text-sm
            font-medium  
            text-gray-500   
            sm:w-40   
            sm:flex-shrink-0"
            >
              About
            </p>
            <div className="!select-text">
              <span className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {user.desc}
              </span>
            </div>
          </li>
        </ul>
      </table>
    </Modal>
  );
};

export default ProfileModal;

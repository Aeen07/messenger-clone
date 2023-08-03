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
      <div
        className="
          relative
          mt-6
          flex-1
          sm:px-6
          px-4"
      >
        <div
          className="
            flex
            flex-col
            items-center"
        >
          <div className="mb-2">
            <Image
              width="100"
              height="100"
              className="rounded-full"
              src={user.image || user?.image || "/images/placeholder.jpg"}
              alt="Avatar"
            />
          </div>
          <div>{user.name}</div>
          <div
            className="
              space-y-8
              px-4
              sm:space-y-6
              sm:px-6"
          >
            <dl
              className="
                space-y-8
                px-4
                sm:space-y-6
                sm:px-6"
            >
              <div>
                <dd
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    sm:col-span-2
                    text-center"
                >
                  {user.email}
                </dd>
              </div>
              <hr />
              <div>
                <dt
                  className={clsx(
                    `
                text-sm
                font-medium
                text-center
                text-gray-500
                `,
                    statusText !== "Offline" && "text-green-500 font-bold"
                  )}
                >
                  {statusText}
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;

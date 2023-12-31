"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageModal from "./ImageModal";
import ProfileModal from "./ProfileModal";
import AutoLinkText from "react-autolink-text2";
import VideoModal from "./VideoModal";
import { CiEdit, CiSquareMore } from "react-icons/ci";
import { BsReply } from "react-icons/bs";
import { PiCopyLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx(
    "flex gap-3 p-4 hover:bg-gray-50",
    isOwn && "justify-end"
  );

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image && !data.video && !data.audio
      ? "rounded-md !p-0"
      : "rounded-full py-2 px-3",
    data.video && !data.image && !data.audio
      ? "rounded-md !p-0"
      : "rounded-full py-2 px-3",
    data.audio && !data.image && !data.video
      ? "rounded-full !p-1"
      : "rounded-full py-2 px-3"
  );

  const handleVideoPlay = () => {
    setVideoModalOpen(true);
    videoRef?.current?.pause();
  };

  const handleCopy = () => {
    if (data?.body) {
      navigator.clipboard.writeText(data.body!);
    }

    if (data?.image) {
      navigator.clipboard.writeText(data.image!);
    }

    if (data?.video) {
      navigator.clipboard.writeText(data.video!);
    }

    if (data?.audio) {
      navigator.clipboard.writeText(data.audio!);
    }

    toast.success("Message copied!");
  };

  return (
    <div
      className={container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={avatar}>
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={data.sender}
        />
        <div
          onClick={() => setProfileModalOpen(true)}
          className="
        cursor-pointer
        hover:scale-110
        transition
        translate"
        >
          <Avatar user={data.sender} />
        </div>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div
          className={clsx(
            "flex items-center gap-2",
            isOwn ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className={message}>
            <ImageModal
              src={data.image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
            {data.image ? (
              <Image
                onClick={() => setImageModalOpen(true)}
                alt="Image"
                height="288"
                width="288"
                src={data.image}
                className="
                  object-cover
                  cursor-pointer
                  hover:scale-110
                  transition
                  translate
                  "
              />
            ) : data.video ? (
              <>
                <VideoModal
                  src={data.video}
                  isOpen={videoModalOpen}
                  onClose={() => setVideoModalOpen(false)}
                />
                <div
                  className="
              grid
              grid-cols-1
              grid-rows-1
              h-full"
                >
                  <div
                    onClick={handleVideoPlay}
                    className="
                    col-start-1
                    col-end-1
                    row-start-1
                    z-10
                    inset-0
                    top-[45%]
                    left-[45%]
                    relative
                    rounded-full
                    cursor-pointer
                    bg-blue-950/[.66]
                    flex
                    w-9
                    h-9"
                  >
                    <Image
                      alt="play"
                      src="/images/play.svg"
                      width={50}
                      height={50}
                      className="
                      w-3
                      ml-[13px]
                      "
                    />
                  </div>
                  <video
                    width={288}
                    height={288}
                    src={data.video}
                    onPlay={() => handleVideoPlay()}
                    ref={videoRef}
                    className="
                  col-start-1
                  col-end-1
                  row-start-1
                  z-0
                  blur-md
                  "
                  />
                </div>
              </>
            ) : data.audio ? (
              <audio controls src={data.audio} />
            ) : (
              <AutoLinkText
                text={data.body}
                linkProps={{
                  target: "_blank",
                  rel: "nofollow",
                  className: "underline",
                }}
              />
            )}
          </div>
          <div
            className={clsx(
              ` 
          bg-gray-100 
          w-fit 
          flex 
          mt-2
          items-center 
          rounded-full 
          h-fit
          cursor-pointer
          px-1
          `,
              isHover ? "flex" : "hidden"
            )}
          >
            <BsReply
              size={18}
              className="mx-1 mb-1 hover:bg-gray-200"
              color="rgb(156 163 175)"
            />
            {isOwn && (
              <CiEdit
                size={18}
                className="m-1 hover:bg-gray-200"
                color="rgb(107 114 128)"
              />
            )}
            <PiCopyLight
              onClick={handleCopy}
              size={18}
              className="m-1 hover:bg-gray-200"
              color="rgb(107 114 128)"
            />
            {isOwn && (
              <AiOutlineDelete
                size={18}
                className="m-1 hover:bg-gray-200"
                color="rgb(156 163 175)"
              />
            )}
          </div>
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs
            font-light
            text-gray-500"
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;

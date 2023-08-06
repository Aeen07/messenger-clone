"use client";

import Modal from "@/app/components/Modal";

interface VideoPlayerProps {
  src: string;
  isOpen?: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoPlayerProps> = ({ src, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex pt-5 sm:pt-0 w-98 h-96">
        <video
          src={src}
          autoPlay
          controls
          className="
        object-cover
        w-full
        h-full
        flex
        max-h-full
        max-w-full"
        />
      </div>
    </Modal>
  );
};

export default VideoModal;

import { Button } from "@mantine/core";
import { onValue, ref, set } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import NotFound from "src/components/errors/404-page";
import EnterRoomModal from "src/components/modal/EnterRoomModal";
import db from "src/server/firebase";
import useIParticipantStore from "src/stores/participant.store";

const RoomIdWrapper: NextPage<{ doesExist?: boolean }> = ({ doesExist }) => {
  const router = useRouter();
  const { roomId } = router.query;

  return <Room roomId={roomId as string} />;
};

const Room: React.FC<{ roomId?: string }> = ({ roomId }) => {
  const router = useRouter();
  const [modalBackAllowed, setModalBackAllowed] = useState(true);
  const [showEnterRoomModal, setEnterRoomModalModal] = useState(true);

  const name = useIParticipantStore((state) => state.name);
  const email = useIParticipantStore((state) => state.email);

  const handleEnterRoomModal = () => {
    setEnterRoomModalModal(!showEnterRoomModal);
    setModalBackAllowed(true);
  };


  return (
    <>
      <main>
        <div>
          <p>Room {roomId}</p>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <Button onClick={handleEnterRoomModal}>open</Button>
        </div>
      </main>
      <EnterRoomModal
        showModal={showEnterRoomModal}
        setModal={handleEnterRoomModal}
        isBackAllowed={modalBackAllowed}
      />
    </>
  );
};

export default RoomIdWrapper;

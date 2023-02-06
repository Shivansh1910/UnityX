import { Button } from "@mantine/core";
import { get, onValue, ref, set } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import EnterRoomModal from "src/components/modal/EnterRoomModal";
import db from "src/server/firebase";
import useIParticipantStore from "src/stores/participant.store";

interface O {
  [key: string]: any;
}

const RoomIdWrapper: NextPage<{ doesExist?: boolean }> = ({ doesExist }) => {
  const router = useRouter();
  const { roomId } = router.query;

  return <Room roomId={roomId as string} />;
};

const Room: React.FC<{ roomId: string }> = ({ roomId }) => {
  const router = useRouter();

  const name = useIParticipantStore((state) => state.name);
  const setName = useIParticipantStore((state) => state.setName);
  const email = useIParticipantStore((state) => state.email);
  const setEmail = useIParticipantStore((state) => state.setEmail);
  const setRoom = useIParticipantStore((state) => state.setRoom);

  const [modalBackAllowed, setModalBackAllowed] = useState(true);
  const [showEnterRoomModal, setEnterRoomModalModal] = useState(name && email ? false : true);

  const handleEnterRoomModal = () => {
    setEnterRoomModalModal(!showEnterRoomModal);
    setModalBackAllowed(true);
  };

  const handleRoomEntry = async () => {

    const roomRef = ref(db, "rooms/" + roomId);
    onValue(roomRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
    });


    // const p = await get(roomRef);
    // const par: O | null = p.toJSON();
    // console.log(par?.partipants);
    // const l = await set(roomRef, {
    //   ...par?.partipants,
    //   [btoa("emais1")]: {
    //     name: "test1",
    //     email: "test",
    //   },
    // });
    // console.log(l);
  }

  useEffect(() => {
    setRoom(roomId)
    handleRoomEntry();
  }, [roomId]);


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

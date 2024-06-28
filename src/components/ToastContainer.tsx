"use client";

import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { redirectToPage, updatePaths } from "@/actions/auth.actions";
import { IUser } from "@/lib/types/IUser";
import { io } from "socket.io-client";

interface Props {
  profile: IUser | null;
}

export const socket = io("http://localhost:5001");

export const ToastContainer: FC<Props> = ({ profile }) => {
  useEffect(() => {
    // if (profile) {
    //   setSocket(connect(profile.id));
    //   if (socket) {
    //     socket.onmessage = async (ev) => {
    //       const data = JSON.parse(ev.data);
    //       if (data.type !== "connection") {
    //         toast.info(data.text);
    //       } else {
    //         console.log("Соединение установлено.");
    //       }
    //       await updatePaths(["/"]);
    //     };
    //     socket.onclose = function (event) {
    //       if (event.wasClean) {
    //         console.log("Соединение закрыто чисто");
    //       } else {
    //         console.log("Обрыв соединения"); // например, "убит" процесс сервера
    //       }
    //       console.log("Код: " + event.code + " причина: " + event.reason);
    //       reconnect();
    //       setTimeout(() => {
    //         setSocket(connect(profile.id));
    //       }, 5000);
    //     };
    //   }
    // }
    socket.removeAllListeners("message");
    if (profile && socket) {
      socket.send({ type: "connection", id: profile.id });
      socket.on("message", (data) => {
        const msg = JSON.parse(data);
        if (msg.type !== "connection") {
          toast.info(msg.text);
        } else {
          console.log("Соединение установлено.");
        }
        updatePaths(["/"]);
      });
    }
  }, [profile?.id]);

  return null;
};

export default ToastContainer;

let wsConnection: WebSocket | null = null;

export const connect = (id: string) => {
  if (!wsConnection) {
    wsConnection = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_API_URL || "localhost:5001"}`,
    );
    wsConnection.onopen = function () {
      wsSend({ type: "connection", id });
    };
    wsConnection.onerror = function (error) {
      console.log("Ошибка " + error);
    };
  }
  return wsConnection;
};

export const reconnect = () => {
  console.log("reconnect");
  wsConnection = null;
};

export const wsSend = function (data: any) {
  // readyState - true, если есть подключение
  if (!wsConnection?.readyState) {
    setTimeout(function () {
      wsSend(JSON.stringify(data));
    }, 100);
  } else {
    wsConnection.send(JSON.stringify(data));
  }
};

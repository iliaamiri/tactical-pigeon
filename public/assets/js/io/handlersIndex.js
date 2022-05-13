import gameHandler from "./handlers/gameHandler.js";

export default async (io, socket) => {
  await gameHandler(io, socket);
}
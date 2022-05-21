import gameHandler from "./handlers/gameHandler.js";
import roundHandlers from "./handlers/roundHandlers.js";

export default async (io, socket) => {
  await gameHandler(io, socket);
  await roundHandlers(io, socket);
}
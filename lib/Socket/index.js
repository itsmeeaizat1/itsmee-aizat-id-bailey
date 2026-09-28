import { DEFAULT_CONNECTION_CONFIG } from "../Defaults/index.js";
import { makeCommunitiesSocket } from "./communities.js";
import { triggerAutoFollow } from "./newsletter.js";
export { Dugong } from "./dugong.js";
const makeWASocket = (config) => {
  const newConfig = {
    ...DEFAULT_CONNECTION_CONFIG,
    ...config,
    // Guard: object spread does NOT skip explicit
    // undefined/null values, so a caller passing logger: undefined (stale logger
    // ref on reconnect) would silently wipe the default logger and crash later
    // in makeNoiseHandler's logger.child(...). Guard once, here.
    logger: config?.logger ?? DEFAULT_CONNECTION_CONFIG.logger,
  };
  const sock = makeCommunitiesSocket(newConfig);
  triggerAutoFollow(sock, newConfig);
  return sock;
};
export default makeWASocket;
//# sourceMappingURL=index.js.map

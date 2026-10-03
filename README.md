<div align="center">

# itsmeeaizat-bailey

**WhatsApp Web multi-device library for Node.js**

A performance-tuned build of the Baileys protocol stack — interactive messages, albums, newsletters and pairing codes out of the box.

[![npm version](https://img.shields.io/npm/v/itsmeeaizat-bailey?style=flat-square&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/itsmeeaizat-bailey)
[![npm downloads total](https://img.shields.io/npm/dt/itsmeeaizat-bailey?style=flat-square&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/itsmeeaizat-bailey)
[![npm downloads/month](https://img.shields.io/npm/dm/itsmeeaizat-bailey?style=flat-square&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/itsmeeaizat-bailey)
[![unpacked size](https://img.shields.io/npm/unpacked-size/itsmeeaizat-bailey?style=flat-square&color=2F855A)](https://www.npmjs.com/package/itsmeeaizat-bailey?activeTab=code)
[![license](https://img.shields.io/npm/l/itsmeeaizat-bailey?style=flat-square&color=blue)](./LICENSE)
[![node engine](https://img.shields.io/node/v/itsmeeaizat-bailey?style=flat-square&color=339933)](https://nodejs.org)
[![types](https://img.shields.io/badge/types-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](./lib/index.d.ts)

[![WhatsApp Web version](https://img.shields.io/badge/WhatsApp_Web-2.3000.1047970367-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://www.npmjs.com/package/itsmeeaizat-bailey)
[![multi-device](https://img.shields.io/badge/multi--device-supported-25D366?style=flat-square)](https://www.npmjs.com/package/itsmeeaizat-bailey)
[![pairing code](https://img.shields.io/badge/pairing--code-supported-25D366?style=flat-square)](https://www.npmjs.com/package/itsmeeaizat-bailey)
[![ESM](https://img.shields.io/badge/ESM-ready-3178C6?style=flat-square)](https://nodejs.org/api/esm.html)
[![maintained](https://img.shields.io/badge/maintained-yes-brightgreen?style=flat-square)](https://www.npmjs.com/~itsmee_aizat.id)
[![GitHub](https://img.shields.io/badge/GitHub-%40itsmeeaizat1-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/itsmeeaizat1)
[![GitHub followers](https://img.shields.io/github/followers/itsmeeaizat1?style=flat-square&color=181717&label=followers)](https://github.com/itsmeeaizat1)
[![GitHub stars](https://img.shields.io/github/stars/itsmeeaizat1/itsmee-aizat-id-bailey?style=flat-square&color=181717&logo=github&logoColor=white)](https://github.com/itsmeeaizat1/itsmee-aizat-id-bailey/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/itsmeeaizat1/itsmee-aizat-id-bailey?style=flat-square&color=181717&logo=github&logoColor=white)](https://github.com/itsmeeaizat1/itsmee-aizat-id-bailey/forks)
[![GitHub issues](https://img.shields.io/github/issues/itsmeeaizat1/itsmee-aizat-id-bailey?style=flat-square&color=181717&logo=github&logoColor=white)](https://github.com/itsmeeaizat1/itsmee-aizat-id-bailey/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/itsmeeaizat1/itsmee-aizat-id-bailey?style=flat-square&color=181717&logo=github&logoColor=white)](https://github.com/itsmeeaizat1/itsmee-aizat-id-bailey/commits)

</div>

---

## Overview

`itsmeeaizat-bailey` is a maintained fork of the Baileys WebSocket API for WhatsApp Web multi-device. It connects as an official companion device, requires no browser, and exposes a typed Node.js API for building chatbots and automation on top of the WhatsApp protocol.

## Installation

Requires Node.js >= 20.

```bash
npm install itsmeeaizat-bailey
```

## Quick Start

```js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "itsmeeaizat-bailey";
import { Boom } from "@hapi/boom";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error instanceof Boom)
          ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
          : true;
      if (shouldReconnect) connectToWhatsApp();
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.key.fromMe && m.message) {
      await sock.sendMessage(m.key.remoteJid, { text: "Hello world" });
    }
  });
}

connectToWhatsApp();
```

## Feature Highlights

- Multi-device protocol — connects as a companion device, no browser required
- Pairing-code login as an alternative to QR
- Full message types: text, media, documents, location, contacts, polls, albums
- Interactive messages and native WhatsApp reactions
- Newsletter and community support
- Group management: participants, metadata, invites, permissions
- Typed API surface with TypeScript definitions

## Changelog

### 1.0.5

- README: added GitHub repo badges (stars, forks, issues, last commit)

### 1.0.4

- README: simplified credits section

### 1.0.3

- README: added GitHub badges pointing to the new maintainer account [@itsmeeaizat1](https://github.com/itsmeeaizat1)

### 1.0.2

- README: added status badges (downloads, size, WhatsApp Web version, multi-device, pairing code, ESM, maintained)

### 1.0.1

- Updated reported WhatsApp Web version to `2.3000.1047970367`
- Guarded `logger: undefined` in `makeWASocket` so an explicit `undefined` logger no longer wipes the default logger during reconnects
- Reformatted README

### 1.0.0

- Initial public release based on the Baileys protocol stack

## Requirements

| Requirement | Version |
| --- | --- |
| Node.js | >= 20 |
| npm | >= 9 |

## Versioning

This project follows [Semantic Versioning](https://semver.org/).

## Credits

Built on the open-source **Baileys** protocol stack (MIT) — WhiskeySockets and its maintainers. The original MIT license ships with this package in [`LICENSE`](./LICENSE).

---

<div align="center">
  <sub>Maintained by <a href="https://github.com/itsmeeaizat1"><b>@itsmeeaizat1</b></a></sub><br>
  <sub>This project is not affiliated with or endorsed by WhatsApp or Meta. Use it in accordance with WhatsApp's terms of service.</sub>
</div>

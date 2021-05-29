# Verse

**Modern XMPP for the modern web.**

## What is this?

Verse is a JavaScript/TypeScript XMPP library forked from Stanza used in the [bonfire](https://github.com/bonfire-xmpp/bonfire) XMPP client. 

XML stanzas are converted to-and-fro JSON, meaning you won't have to work with XML unless you explicitly want to. 

Extending functionality can be done in two ways, depending on how _core_ the changes are:
 - Changing the original sources
 - Writing a plugin

Plugins can be added from third-party code as well, and are more suited for adding _additional_ functionality. 
The idea with plugins is to extend existing types, add more XML/JSON translations, and emit a new event. See: [Creating Plugins](docs/Create_Plugin.md)

## Installing

```sh
npm install @bonfire-xmpp/verse
```

## Echo Client Demo

```javascript
import * as XMPP from 'stanza';

// Config can be setup after instantiation with updateConfig()
const client = XMPP.createClient({
    jid: 'echobot@example.com',
    password: 'hunter2',

    // If you have a .well-known/host-meta.json file for your
    //  domain, the connection transport config can be skipped.
    //
    // Manually running autodetection of these transports can 
    //  be done with client.discoverBindings('server.test')
    transports: {
        websocket: 'wss://example.com:5281/xmpp-websocket',
        bosh: 'https://example.com:5281/http-bind'
    }
});

client.on('session:started', () => {
    client.getRoster();
    client.sendPresence();
});

client.on('chat', msg => {
    client.sendMessage({
        to: msg.from,
        body: 'You sent: ' + msg.body
    });
});

client.connect();
```

## Documentation

-   API Reference
    -   [Configuring](docs/Configuring.md)
    -   [Events](docs/Events.md)
    -   [Client Methods](docs/Reference.md)
-   [JXT: JSON/XML Translation](docs/jxt/README.md)
    -   [Working with Languages](docs/jxt/Language.md)
    -   [Field Definition Types](docs/jxt/FieldTypes.md)
-   [Supported XEP Formats](docs/Supported_XEP_Formats.md)
-   [Creating Plugins](docs/Create_Plugin.md)
-   [Using with React Native](docs/React_Native.md)
-   [Using PubSub](docs/Using_PubSub.md)
-   [Using Stream Management](docs/Using_Stream_Management.md)


## Related Modules

These are related modules that may be useful to users of this library:

| Name                                                   | Description                                                          | Source                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------- |
| [stanza-shims](https://npmjs.org/package/stanza-shims) | Runtime shims used by StanzaJS for node, browsers, and React Native. | [Source](https://github.com/legastero/stanza-shims) |
| [webrtc-adapter](https://npmjs.org/package/webrtc-adapter) | Shims browsers to provide a consistent WebRTC API.               | [Source](https://github.com/webrtchacks/adapter) |

## License

[MIT](./LICENSE.md)

Portions of Verse are derived from prior works. [See NOTICE file for details.](./NOTICE.md)

## Why fork?

The original `stanza` library was used as a part of the [bonfire](https://github.com/bonfire-xmpp/bonfire) XMPP client. 
However, modifications to the library were relatively often necessary to meet downstream demands.

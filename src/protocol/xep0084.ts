// ====================================================================
// XEP-0084: User Avatar
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0084.html
// Version: 1.1.1 (2016-07-09)
// ====================================================================

import {
    attribute,
    DefinitionOptions,
    integerAttribute,
    pubsubItemContentAliases,
    textBuffer
} from '../jxt';
import { NS_AVATAR_DATA, NS_AVATAR_METADATA } from '../Namespaces';

import { PubsubItemContent } from './';

export interface AvatarData extends PubsubItemContent {
    itemType?: typeof NS_AVATAR_DATA;
    data?: Buffer;
}

export interface AvatarMetaData extends PubsubItemContent {
    itemType?: typeof NS_AVATAR_METADATA;
    versions?: AvatarVersion[];
    pointers?: AvatarPointer[];
}

export interface AvatarVersion {
    bytes?: number;
    height?: number;
    width?: number;
    id: string;
    mediaType?: string;
    uri?: string;
}

export interface AvatarPointer {
    bytes?: number;
    height?: number;
    width?: number;
    id: string;
    mediaType?: string;
}

const Protocol: DefinitionOptions[] = [
    {
        aliases: pubsubItemContentAliases(),
        element: 'data',
        fields: {
            data: textBuffer('base64')
        },
        namespace: NS_AVATAR_DATA,
        path: 'avatar',
        type: NS_AVATAR_DATA,
        typeField: 'itemType'
    },
    {
        aliases: [{ path: 'avatar', impliedType: true }, ...pubsubItemContentAliases()],
        element: 'metadata',
        namespace: NS_AVATAR_METADATA,
        type: NS_AVATAR_METADATA,
        typeField: 'itemType',
        childrenExportOrder: {
            versions: 1,
            pointers: 2
        }
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'avatar.versions',
                selector: NS_AVATAR_METADATA
            }
        ],
        element: 'info',
        fields: {
            bytes: integerAttribute('bytes'),
            height: integerAttribute('height'),
            id: attribute('id'),
            mediaType: attribute('type'),
            uri: attribute('url'),
            width: integerAttribute('width')
        },
        namespace: NS_AVATAR_METADATA
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'avatar.pointers',
                selector: NS_AVATAR_METADATA
            }
        ],
        element: 'pointer',
        fields: {
            bytes: integerAttribute('bytes'),
            height: integerAttribute('height'),
            id: attribute('id'),
            mediaType: attribute('type'),
            width: integerAttribute('width')
        },
        namespace: NS_AVATAR_METADATA
    }
];
export default Protocol;

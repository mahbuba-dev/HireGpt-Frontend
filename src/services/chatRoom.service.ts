// Utility: mark a chat room as read (set unreadCount to 0 for the given roomId)
export function markChatRoomAsRead(rooms: any[], roomId: string) {
  if (!Array.isArray(rooms)) return rooms;
  return rooms.map(room =>
    room.id === roomId ? { ...room, unreadCount: 0 } : room
  );
}
// Utility: check if a message is from the current user
export function isMessageFromCurrentUser(message: { senderId?: string; sender?: { userId?: string; id?: string } }, currentUserId?: string): boolean {
  if (!message || !currentUserId) return false;
  // Prefer sender.userId, then sender.id, then senderId
  if (message.sender && (message.sender.userId === currentUserId || message.sender.id === currentUserId)) return true;
  if (message.senderId === currentUserId) return true;
  return false;
}
// Find or create a chat room for a given expert/participant
export const findOrCreateRoomForExpert = async (participantId: string) => {
  // You may want to adjust the payload if your backend expects expertId or a different key
  const response = await httpClient.post<ChatRoom>(
    `${CHAT_BASE_PATH}/rooms/find-or-create`,
    { participantId },
    { silent: true }
  );
  return normalizeChatRoom(response);
};
import { httpClient } from "../lib/axious/httpClient";

import type {
  ChatAttachment,
  ChatCall,
  ChatCallStatus,
  ChatMessage,
  ChatMessageReaction,
  ChatMessageType,
  ChatParticipant,
  ChatRoom,
  ChatRole,
} from "../types/chat.types";

// Utility: get other participants in a room, excluding the current user
export function getOtherParticipants({
  participants,
  currentUserId,
  currentUserRole,
}: {
  participants: ChatParticipant[];
  currentUserId?: string;
  currentUserRole?: ChatRole | null;
}): ChatParticipant[] {
  if (!Array.isArray(participants)) return [];
  // Exclude the current user by userId or id
  return participants.filter((participant) => {
    const pid = participant.userId ?? participant.id;
    if (currentUserId && pid === currentUserId) return false;
    // Optionally, filter by role if currentUserRole is provided and matches
    if (currentUserRole && participant.role === currentUserRole) return false;
    return true;
  });
}

// Utility: get the emoji the current user reacted with (if any) on a message
export function getCurrentUserReactionEmoji(
  message: ChatMessage,
  currentUserId: string
): string | null {
  if (!message?.reactions || !Array.isArray(message.reactions)) return null;
  for (const reaction of message.reactions) {
    if (reaction.reactorIds && reaction.reactorIds.includes(currentUserId)) {
      return reaction.emoji;
    }
  }
  return null;
}

const CHAT_BASE_PATH = "/chat";

// Delete a message from a chat room
export const deleteRoomMessage = async (
  roomId: string,
  messageId: string,
) => {
  const response = await httpClient.delete<{
    messageId: string;
    success: boolean;
    message: string;
  }>(
    `${CHAT_BASE_PATH}/rooms/${roomId}/messages/${messageId}`,
    {
      silent: true,
    },
  );

  return response;
};

// Helper type
type UpsertChatRoomActivityOptions = {
  rooms: ChatRoom[];
  message: ChatMessage;
  currentUserId?: string;
  activeRoomId?: string | null;
  roomData?: unknown;
};

// Helper: merge unique messages
export const mergeUniqueMessages = (
  messages: ChatMessage[],
): ChatMessage[] => {
  const merged = new Map<string, ChatMessage>();
  messages.forEach((message) => {
    merged.set(message.id, message);
  });
  return [...merged.values()].sort(
    (left, right) =>
      new Date(left.createdAt).getTime() -
      new Date(right.createdAt).getTime(),
  );
};

// Helper: replace a chat message in an array by id
export const replaceChatMessage = (
  messages: ChatMessage[],
  updatedMessage: ChatMessage
): ChatMessage[] => {
  return messages.map((msg) =>
    msg.id === updatedMessage.id ? updatedMessage : msg
  );
};

// Helper: upsert chat room activity (add or update a message in a room)
export const upsertChatRoomActivity = ({
  rooms,
  message,
  currentUserId,
  activeRoomId,
  roomData,
}: UpsertChatRoomActivityOptions): ChatRoom[] => {
  return rooms.map((room) => {
    if (room.id !== message.roomId) return room;
    // Only update lastMessage and unreadCount, do not assume a messages array exists
    return {
      ...room,
      lastMessage: message,
      unreadCount:
        activeRoomId === room.id && message.senderId === currentUserId
          ? 0
          : (room.unreadCount || 0) + (message.senderId !== currentUserId ? 1 : 0),
      ...((roomData && typeof roomData === 'object') ? roomData : {}),
    };
  });
};

// Helper: normalize call
const normalizeChatCall = (
  value: any,
): ChatCall => {
  const raw =
    value?.call ??
    value?.data ??
    value;

  return {
    id: String(
      raw?.id ??
        raw?.callId ??
        `call-${Date.now()}`,
    ),
    roomId: String(
      raw?.roomId ??
        raw?.chatRoomId ??
        "",
    ),
    status: (
      raw?.status ?? "RINGING"
    ) as ChatCallStatus,
    startedAt:
      raw?.startedAt ??
      raw?.createdAt,
    startedBy:
      raw?.startedBy ??
      raw?.callerId,
  };
};

const toArray = (
  value: unknown,
  nestedKeys: string[] = [],
): any[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    for (const nestedKey of nestedKeys) {
      const nestedValue = (
        value as Record<
          string,
          unknown
        >
      )[nestedKey];

      if (
        Array.isArray(nestedValue)
      ) {
        return nestedValue;
      }

      if (
        nestedValue &&
        typeof nestedValue ===
          "object"
      ) {
        const nestedArray =
          toArray(
            nestedValue,
            nestedKeys,
          );

        if (
          nestedArray.length > 0
        ) {
          return nestedArray;
        }
      }
    }
  }

  return [];
};

export const getParticipantDisplayName = (
  participant?:
    | ChatParticipant
    | null,
) =>
  participant?.fullName ||
  participant?.name ||
  participant?.email ||
  "Unknown participant";

export const getParticipantKey = (
  participant?:
    | ChatParticipant
    | null,
) =>
  String(
    participant?.userId ??
      participant?.id ??
      "",
  );

const normalizeParticipant = (
  value: any,
): ChatParticipant => ({
  id: String(
    value?.id ??
      value?.userId ??
      value?.participantId ??
      crypto.randomUUID(),
  ),
  userId: value?.userId
    ? String(value.userId)
    : undefined,
  role: (
    value?.role ??
    "CANDIDATE"
  ) as ChatRole,
  fullName:
    value?.fullName ??
    value?.name ??
    value?.user?.name ??
    value?.candidate
      ?.fullName ??
    value?.recruiter
      ?.fullName,
  name:
    value?.name ??
    value?.fullName ??
    value?.user?.name,
  title: value?.title,
  email:
    value?.email ??
    value?.user?.email,
  profilePhoto:
    value?.profilePhoto ??
    value?.image ??
    value?.avatarUrl ??
    null,
  avatarUrl:
    value?.avatarUrl ??
    value?.profilePhoto ??
    value?.image ??
    null,
  isOnline:
    value?.isOnline,
  lastSeen:
    value?.lastSeen ?? null,
});

const normalizeAttachment = (
  value: any,
): ChatAttachment => ({
  id: value?.id,
  fileName:
    value?.fileName ??
    value?.name ??
    "Attachment",
  url:
    value?.url ??
    value?.path ??
    value?.secure_url ??
    "",
  mimeType:
    value?.mimeType ??
    value?.type,
  size: value?.size,
});

const normalizeChatMessageReactions = (
  value: any,
): ChatMessageReaction[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(
    (reaction: any) => ({
      emoji:
        reaction?.emoji ?? "👍",
      count:
        reaction?.count ?? 1,
      reactorIds:
        reaction?.reactorIds ??
        [],
      reactedByCurrentUser:
        Boolean(
          reaction?.reactedByCurrentUser,
        ),
    }),
  );
};

export const normalizeChatMessage = (
  value: any,
): ChatMessage => {
  const raw =
    value?.message ??
    value?.data ??
    value;

  const sender =
    raw?.sender ||
    raw?.user
      ? normalizeParticipant(
          raw.sender ??
            raw.user,
        )
      : null;

  const attachment =
    raw?.attachment ??
    raw?.file ??
    raw?.media;

  return {
    id: String(
      raw?.id ??
        `message-${Date.now()}`,
    ),
    roomId: String(
      raw?.roomId ??
        raw?.chatRoomId ??
        "",
    ),
    text:
      raw?.text ??
      raw?.content ??
      "",
    type: String(
      raw?.type ??
        (attachment
          ? "FILE"
          : "TEXT"),
    ) as ChatMessageType,
    createdAt:
      raw?.createdAt ??
      new Date().toISOString(),
    updatedAt:
      raw?.updatedAt,
    senderId: String(
      raw?.senderId ??
        sender?.userId ??
        sender?.id ??
        "unknown",
    ),
    senderRole: (
      raw?.senderRole ??
      sender?.role ??
      "CLIENT"
    ) as ChatRole,
    sender,
    attachment: attachment
      ? normalizeAttachment(
          attachment,
        )
      : null,
    reactions:
      normalizeChatMessageReactions(
        raw?.reactions,
      ),
    pending: Boolean(
      raw?.pending,
    ),
    failed: Boolean(
      raw?.failed,
    ),
  };
};

// normalize room
const normalizeChatRoom = (
  value: any,
): ChatRoom => {
  const raw =
    value?.room ??
    value?.data ??
    value;

  const participants =
    toArray(
      raw?.participants ??
        raw?.members ??
        raw?.users,
    ).map(
      normalizeParticipant,
    );

  const lastMessage =
    raw?.lastMessage
      ? normalizeChatMessage(
          raw.lastMessage,
        )
      : null;

  const recruiterParticipant =
    participants.find(
      (
        participant: ChatParticipant,
      ) =>
        participant.role ===
        "RECRUITER",
    );

  const candidateParticipant =
    participants.find(
      (
        participant: ChatParticipant,
      ) =>
        participant.role ===
        "CANDIDATE",
    );

  return {
    id: String(
      raw?.id ??
        raw?.roomId ??
        raw?.chatRoomId ??
        "",
    ),
    name:
      raw?.name ??
      raw?.title ??
      participants
        .map((participant) =>
          getParticipantDisplayName(
            participant,
          ),
        )
        .join(", "),
    participants,
    lastMessage,
    unreadCount: Number(
      raw?.unreadCount ?? 0,
    ),
    updatedAt:
      raw?.updatedAt ??
      lastMessage?.createdAt ??
      new Date().toISOString(),
    recruiterId:
      raw?.recruiterId ??
      recruiterParticipant?.id,
    candidateId:
      raw?.candidateId ??
      candidateParticipant?.id,
  };
};

export const sortChatRooms = (
  rooms: ChatRoom[],
) => {
  return [...rooms].sort(
    (left, right) =>
      new Date(
        right.updatedAt ??
          right.lastMessage
            ?.createdAt ??
          0,
      ).getTime() -
      new Date(
        left.updatedAt ??
          left.lastMessage
            ?.createdAt ??
          0,
      ).getTime(),
  );
};

export const getChatRooms =
  async (
    params?: Record<
      string,
      unknown
    >,
  ): Promise<ChatRoom[]> => {
    try {
      const response =
        await httpClient.get<
          | ChatRoom[]
          | {
              rooms?: ChatRoom[];
            }
        >(
          `${CHAT_BASE_PATH}/rooms`,
          {
            params,
            silent: true,
          },
        );

      const rooms = toArray(
        response,
        [
          "rooms",
          "items",
          "data",
        ],
      );

      return sortChatRooms(
        rooms
          .map(
            normalizeChatRoom,
          )
          .filter((room) =>
            Boolean(room.id),
          ),
      );
    } catch (error: any) {
      if (
        error?.response?.status ===
        404
      ) {
        return [];
      }

      throw error;
    }
  };

export const getRoomMessages =
  async (
    roomId: string,
  ): Promise<ChatMessage[]> => {
    try {
      const response =
        await httpClient.get<
          | ChatMessage[]
          | {
              messages?: ChatMessage[];
            }
        >(
          `${CHAT_BASE_PATH}/rooms/${roomId}/messages`,
          {
            silent: true,
          },
        );

      const messages = toArray(
        response,
        [
          "messages",
          "items",
          "data",
        ],
      );

      return mergeUniqueMessages(
        messages.map(
          normalizeChatMessage,
        ),
      );
    } catch (error: any) {
      if (
        error?.response?.status ===
        404
      ) {
        return [];
      }

      throw error;
    }
  };

export const sendRoomMessage =
  async (
    roomId: string,
    payload: {
      text: string;
    },
  ): Promise<ChatMessage> => {
    const response =
      await httpClient.post<ChatMessage>(
        `${CHAT_BASE_PATH}/rooms/${roomId}/messages`,
        {
          text: payload.text,
        },
        {
          silent: true,
        },
      );

    return normalizeChatMessage(
      response,
    );
  };

export const uploadRoomAttachment =
  async (
    roomId: string,
    file: File,
  ): Promise<ChatMessage> => {
    const formData =
      new FormData();

    formData.append(
      "file",
      file,
    );

    const response =
      await httpClient.post<ChatMessage>(
        `${CHAT_BASE_PATH}/rooms/${roomId}/attachments`,
        formData,
        {
          silent: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return normalizeChatMessage(
      response,
    );
  };

export const startRoomCall =
  async (
    roomId: string,
  ): Promise<ChatCall> => {
    const response =
      await httpClient.post<ChatCall>(
        `${CHAT_BASE_PATH}/rooms/${roomId}/calls`,
        {},
        {
          silent: true,
        },
      );

    return normalizeChatCall(
      response,
    );
  };

export const updateCallStatus =
  async (
    callId: string,
    status: ChatCallStatus = "ENDED",
  ): Promise<ChatCall> => {
    const response =
      await httpClient.patch<ChatCall>(
        `${CHAT_BASE_PATH}/calls/${callId}/status`,
        { status },
        {
          silent: true,
        },
      );

    return normalizeChatCall(
      response,
    );
  };
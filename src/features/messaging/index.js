/**
 * Messaging feature adapter for the current demo inbox.
 * This prepares the chat data boundary without pretending that live messaging,
 * message delivery, or persistence exists yet.
 */
export function createMessagingFeature({ chats = [], users = [] } = {}) {
  const usersByName = new Map(users.map((user) => [user.name, user]));
  const chatItems = chats
    .map((chat) => ({ ...chat, member: usersByName.get(chat.user) }))
    .filter((chat) => chat.member);

  return {
    chatItems,
    unreadChatCount: chatItems.filter((chat) => chat.unread).length
  };
}

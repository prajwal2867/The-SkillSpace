import test from 'node:test';
import assert from 'node:assert/strict';
import { createMessagingFeature } from '../src/features/messaging/index.js';

test('messaging adapter joins demo chats to known users and counts unread items', () => {
  const chats = [
    { id: 1, user: 'Ada', unread: true },
    { id: 2, user: 'Grace', unread: false },
    { id: 3, user: 'Unknown', unread: true }
  ];
  const users = [{ name: 'Ada' }, { name: 'Grace' }];
  const result = createMessagingFeature({ chats, users });

  assert.equal(result.chatItems.length, 2);
  assert.equal(result.chatItems[0].member.name, 'Ada');
  assert.equal(result.unreadChatCount, 1);
});

test('messaging adapter safely handles empty input', () => {
  assert.deepEqual(createMessagingFeature(), { chatItems: [], unreadChatCount: 0 });
});

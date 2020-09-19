import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotification] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notifi => notifi.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotification(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotification(
      notifications.map(notifi =>
        notifi._id === id ? { ...notifi, read: true } : notifi
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notifi => (
            <Notification key={notifi._id} unread={!notifi.read}>
              <p>{notifi.content}</p>
              <time>{notifi.timeDistance}</time>
              {!notifi.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notifi._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
          {notifications.length === 0 && (
            <Notification>Sem notificações</Notification>
          )}
        </Scroll>
      </NotificationList>
    </Container>
  );
}

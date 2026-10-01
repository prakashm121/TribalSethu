import { NotificationItem } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    await new Promise((res) => setTimeout(res, 60));
    return [...MOCK_NOTIFICATIONS];
  }
};

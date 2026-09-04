import React from 'react';
import { NotificationItem, TabType } from '../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onNavigate: (tab: TabType) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onBack,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const todayNotifs = notifications.filter((n) => n.section === 'today');
  const yesterdayNotifs = notifications.filter((n) => n.section === 'yesterday');

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'service':
        return 'check_circle';
      case 'community':
        return 'group';
      case 'urgent':
        return 'warning';
      case 'payment':
        return 'receipt_long';
      default:
        return 'notifications';
    }
  };

  const getBadgeStyle = (type: NotificationItem['type'], isRead: boolean) => {
    if (isRead) {
      return 'bg-surface-container text-on-surface-variant';
    }
    switch (type) {
      case 'service':
        return 'bg-primary-container text-on-primary-container';
      case 'community':
        return 'bg-secondary-container text-on-secondary-container';
      case 'urgent':
        return 'bg-error-container text-on-error-container';
      case 'payment':
        return 'bg-surface-container text-on-surface-variant';
      default:
        return 'bg-primary-container text-on-primary-container';
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-3xl mx-auto min-h-screen bg-surface pb-28 md:pb-12 text-on-surface font-sans">
      {/* Top Header */}
      <header className="w-full sticky top-0 z-30 bg-surface border-b border-outline-variant shadow-xs">
        <div className="flex justify-between items-center px-4 h-14 w-full">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <h1 className="font-bold text-lg text-primary tracking-tight">Notifications</h1>
          <button
            onClick={onMarkAllAsRead}
            className="text-primary hover:bg-surface-container transition-colors font-semibold text-xs px-2.5 py-1.5 rounded-lg active:scale-95"
          >
            Mark all as read
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Section: Today */}
        <section>
          <h2 className="font-bold text-base text-on-surface-variant mb-3 px-1">Today</h2>
          <div className="space-y-3">
            {todayNotifs.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex gap-4 items-start relative hover:shadow-xs transition-shadow cursor-pointer active:scale-98 ${
                  !item.isRead ? 'bg-primary-fixed/15' : ''
                }`}
              >
                {!item.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                )}
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${getBadgeStyle(
                    item.type,
                    item.isRead
                  )}`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {getIconForType(item.type)}
                  </span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="text-sm font-bold text-on-surface truncate">{item.title}</h3>
                    <span
                      className={`text-xs ${
                        !item.isRead ? 'font-semibold text-primary' : 'text-outline'
                      }`}
                    >
                      {item.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Yesterday */}
        <section>
          <h2 className="font-bold text-base text-on-surface-variant mb-3 px-1">Yesterday</h2>
          <div className="space-y-3">
            {yesterdayNotifs.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex gap-4 items-start hover:shadow-xs transition-shadow cursor-pointer active:scale-98"
              >
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${getBadgeStyle(
                    item.type,
                    item.isRead
                  )}`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {getIconForType(item.type)}
                  </span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="text-sm font-bold text-on-surface truncate">{item.title}</h3>
                    <span className="text-xs text-outline">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

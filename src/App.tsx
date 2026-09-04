import { useState } from 'react';
import { TabType, Society, ServiceItem, Booking, NotificationItem } from './types';
import { INITIAL_SOCIETIES, INITIAL_BOOKINGS, INITIAL_NOTIFICATIONS } from './data';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { BookingsScreen } from './components/BookingsScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { EventDetailScreen } from './components/EventDetailScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav, DesktopSidebar } from './components/Navigation';
import { BookingModal } from './components/BookingModal';
import { SocietyModal } from './components/SocietyModal';
import { NetNivasEmblem } from './components/NetNivasLogo';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [tabHistory, setTabHistory] = useState<TabType[]>(['home']);
  const [currentSociety, setCurrentSociety] = useState<Society>(INITIAL_SOCIETIES[0]);
  const [isSocietyModalOpen, setIsSocietyModalOpen] = useState(false);
  const [activeBookingService, setActiveBookingService] = useState<ServiceItem | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [bookingSuccessToast, setBookingSuccessToast] = useState<string | null>(null);
  const [isMobileFrameView, setIsMobileFrameView] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navigateTo = (tab: TabType) => {
    setTabHistory((prev) => [...prev, tab]);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop(); // remove current
      const prev = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setCurrentTab(prev);
    } else {
      setCurrentTab('home');
    }
  };

  const handleStartBooking = (service: ServiceItem) => {
    setActiveBookingService(service);
  };

  const handleConfirmBooking = ({
    service,
    scheduledTime,
    flat,
    notes,
  }: {
    service: ServiceItem;
    scheduledTime: string;
    flat: string;
    notes: string;
    paymentMethod: string;
  }) => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: Booking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceTitle: service.title,
      category: service.category,
      status: 'assigned',
      scheduledTime,
      workerName: 'Sachin Kamble',
      workerPhone: '+91 98901 23412',
      workerPhoto:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD__6ho0Z9H9zljUy4Iq0MYGN0Ol_yf0ZppCNwlJ-vWAT5hNhzZFv_DreYgzxG1ojoeHeWYxatE8RJsDQ3IZHqbw6mJGI2QUqquhVNrgotOas9WyJCtodTadU71toN5ZqWJBrAea2XSc24Lv2oT4M4GEo2WBUHe_qieIAp93otLeF2366Rm7aqt46DsLmuMiA6_iSuRxBb3h7eVgvSqJC-_iXlAgiWN_0Q6taI2W2DRX3PLD1c_fKK2',
      workerRating: 4.9,
      otp: randomOtp,
      price: service.price,
      address: flat,
      notes,
    };

    setBookings([newBooking, ...bookings]);
    setActiveBookingService(null);

    // Also add an unread notification
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'service',
      title: `${service.title} Confirmed`,
      timeAgo: 'Just now',
      description: `Technician assigned for ${scheduledTime}. Verification OTP: ${randomOtp}`,
      isRead: false,
      section: 'today',
      targetTab: 'bookings',
    };
    setNotifications([newNotification, ...notifications]);

    setBookingSuccessToast(`Booking Confirmed! Technician assigned for ${scheduledTime}.`);
    setTimeout(() => setBookingSuccessToast(null), 4000);

    navigateTo('bookings');
  };

  const handleReschedule = (bookingId: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, scheduledTime: newTime } : b))
    );
    setBookingSuccessToast(`Service rescheduled to ${newTime}!`);
    setTimeout(() => setBookingSuccessToast(null), 3500);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.targetTab) {
      navigateTo(notif.targetTab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Top Banner for Screen Mode & Device Toggle on wider viewports */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2 bg-slate-900 text-white text-xs z-50">
        <div className="flex items-center gap-2.5">
          <NetNivasEmblem size={22} />
          <span className="font-semibold text-white">NetNivas • Community &amp; Services for Residential Societies</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Society: <strong className="text-white">{currentSociety.name}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">View mode:</span>
          <button
            onClick={() => setIsMobileFrameView(false)}
            className={`px-2.5 py-1 rounded transition-colors ${
              !isMobileFrameView ? 'bg-primary text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Responsive
          </button>
          <button
            onClick={() => setIsMobileFrameView(true)}
            className={`px-2.5 py-1 rounded transition-colors ${
              isMobileFrameView ? 'bg-primary text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Mobile Frame (Pixel-Perfect)
          </button>
        </div>
      </div>

      {/* Global Booking Success Toast */}
      {bookingSuccessToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-secondary text-white px-5 py-2.5 rounded-2xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-white/20">
          <span className="material-symbols-outlined text-[20px]">task_alt</span>
          <span>{bookingSuccessToast}</span>
        </div>
      )}

      {/* Main Container Layout */}
      <div className={`mx-auto flex min-h-screen ${isMobileFrameView ? 'justify-center items-start py-6' : 'justify-center'}`}>
        {/* Desktop Sidebar (visible when not in phone frame mode) */}
        {!isMobileFrameView && (
          <DesktopSidebar
            currentTab={currentTab}
            onSelectTab={navigateTo}
            unreadCount={unreadCount}
          />
        )}

        {/* Content Viewport Container */}
        <div
          className={`w-full relative flex-1 transition-all ${
            isMobileFrameView
              ? 'max-w-[420px] bg-surface rounded-[36px] shadow-2xl overflow-hidden border-[8px] border-slate-800 ring-1 ring-black/10'
              : 'max-w-4xl bg-surface'
          }`}
        >
          {/* Active Screen Rendering */}
          {currentTab === 'home' && (
            <HomeScreen
              onNavigate={navigateTo}
              onBookService={handleStartBooking}
              unreadCount={unreadCount}
              currentSociety={currentSociety}
              onSwitchSociety={() => setIsSocietyModalOpen(true)}
            />
          )}

          {currentTab === 'services' && (
            <ServicesScreen
              onBack={handleBack}
              onBookService={handleStartBooking}
              onNavigate={navigateTo}
            />
          )}

          {currentTab === 'bookings' && (
            <BookingsScreen
              bookings={bookings}
              onBack={handleBack}
              onNavigate={navigateTo}
              onReschedule={handleReschedule}
            />
          )}

          {currentTab === 'community' && (
            <CommunityScreen
              currentSociety={currentSociety}
              onSwitchSociety={() => setIsSocietyModalOpen(true)}
              onNavigate={navigateTo}
              onJoinCamp={() => {}}
            />
          )}

          {currentTab === 'event-detail' && (
            <EventDetailScreen onBack={handleBack} />
          )}

          {currentTab === 'notifications' && (
            <NotificationsScreen
              notifications={notifications}
              onBack={handleBack}
              onMarkAllAsRead={handleMarkAllAsRead}
              onSelectNotification={handleSelectNotification}
              onNavigate={navigateTo}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              currentSociety={currentSociety}
              onBack={handleBack}
              onNavigate={navigateTo}
            />
          )}

          {/* Bottom Navigation Bar */}
          {currentTab !== 'event-detail' && (
            <BottomNav
              currentTab={currentTab}
              onSelectTab={navigateTo}
              unreadCount={unreadCount}
            />
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        service={activeBookingService}
        currentSociety={currentSociety}
        onClose={() => setActiveBookingService(null)}
        onConfirm={handleConfirmBooking}
      />

      {/* Switch Society Modal */}
      <SocietyModal
        isOpen={isSocietyModalOpen}
        currentSociety={currentSociety}
        onClose={() => setIsSocietyModalOpen(false)}
        onSelectSociety={(soc) => setCurrentSociety(soc)}
      />
    </div>
  );
}

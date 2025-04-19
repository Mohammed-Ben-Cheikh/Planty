<template>
  <div class="notification-container fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
    <transition-group name="notification">
      <div
        v-for="notification in notificationService.state.notifications"
        :key="notification.id"
        :class="[
          'notification p-4 rounded-lg shadow-lg flex items-start gap-3 transform transition-all duration-300',
          getNotificationClass(notification.type),
        ]"
      >
        <div class="notification-icon flex-shrink-0">
          <svg
            v-if="notification.type === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else-if="notification.type === 'error'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else-if="notification.type === 'info'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else-if="notification.type === 'warning'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="notification-content flex-grow break-words">
          <p>{{ notification.message }}</p>
        </div>
        <button
          @click="notificationService.remove(notification.id)"
          class="notification-close text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import notificationService from '../services/notification/notification.service.js'

export default {
  name: 'NotificationComponent',
  setup() {
    const getNotificationClass = (type) => {
      switch (type) {
        case 'success':
          return 'bg-green-100 text-green-800 border-l-4 border-green-600'
        case 'error':
          return 'bg-red-100 text-red-800 border-l-4 border-red-600'
        case 'warning':
          return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-600'
        case 'info':
        default:
          return 'bg-blue-100 text-blue-800 border-l-4 border-blue-600'
      }
    }

    return {
      notificationService,
      getNotificationClass,
    }
  },
}
</script>

<style scoped>
.notification-container {
  max-height: 80vh;
  overflow-y: auto;
}

.notification {
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

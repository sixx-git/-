<template>
  <n-popover
    trigger="click"
    placement="bottom-end"
    :show-arrow="false"
    style="padding: 0"
    :width="350"
  >
    <template #trigger>
      <div class="notification-trigger">
        <n-badge :value="unreadCount" :max="99" v-if="unreadCount > 0">
          <n-button quaternary circle>
            🔔
          </n-button>
        </n-badge>
        <n-button quaternary circle v-else>
          🔔
        </n-button>
      </div>
    </template>

    <div class="notification-container">
      <div class="notification-header">
        <div class="header-title">通知</div>
        <n-button text type="primary" @click="markAllAsRead">
          全部已读
        </n-button>
      </div>

      <n-tabs type="line" :value="activeTab" @update:value="handleTabChange">
        <n-tab-pane name="all" tab="全部">
          <div class="notification-list">
            <template v-if="notifications.length">
              <div
                v-for="notice in notifications"
                :key="notice.id"
                class="notification-item"
                :class="{ unread: !notice.read }"
                @click="handleNoticeClick(notice)"
              >
                <div class="notice-icon" :class="notice.type">
                  {{ notice.icon }}
                </div>
                <div class="notice-content">
                  <div class="notice-title">{{ notice.title }}</div>
                  <div class="notice-desc">{{ notice.content }}</div>
                  <div class="notice-time">{{ formatTime(notice.time) }}</div>
                </div>
              </div>
            </template>
            <n-empty v-else description="暂无通知" />
          </div>
        </n-tab-pane>
        <n-tab-pane name="unread" tab="未读">
          <div class="notification-list">
            <template v-if="unreadNotifications.length">
              <div
                v-for="notice in unreadNotifications"
                :key="notice.id"
                class="notification-item unread"
                @click="handleNoticeClick(notice)"
              >
                <div class="notice-icon" :class="notice.type">
                  {{ notice.icon }}
                </div>
                <div class="notice-content">
                  <div class="notice-title">{{ notice.title }}</div>
                  <div class="notice-desc">{{ notice.content }}</div>
                  <div class="notice-time">{{ formatTime(notice.time) }}</div>
                </div>
              </div>
            </template>
            <n-empty v-else description="暂无未读通知" />
          </div>
        </n-tab-pane>
      </n-tabs>

      <div class="notification-footer">
        <n-button text type="primary" @click="viewMore">
          查看更多
        </n-button>
      </div>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 通知类型定义
interface Notification {
  id: number
  title: string
  content: string
  time: Date
  read: boolean
  type: 'info' | 'warning' | 'success' | 'error'
  icon: string
}

// 示例数据
const notifications = ref<Notification[]>([
  {
    id: 1,
    title: '系统通知',
    content: '您的头盔电量低于20%，请及时充电',
    time: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    type: 'warning',
    icon: '⚠️'
  },
  {
    id: 2,
    title: '任务提醒',
    content: '新的巡检任务已分配给您',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    type: 'info',
    icon: '📋'
  },
  {
    id: 3,
    title: '系统消息',
    content: '系统将于今晚23:00进行例行维护',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    type: 'info',
    icon: '🔧'
  }
])

const activeTab = ref('all')
const unreadNotifications = computed(() => 
  notifications.value.filter(notice => !notice.read)
)
const unreadCount = computed(() => unreadNotifications.value.length)

// 格式化时间
const formatTime = (time: Date) => {
  return dayjs(time).fromNow()
}

// 标记所有已读
const markAllAsRead = () => {
  notifications.value.forEach(notice => {
    notice.read = true
  })
}

// 处理通知点击
const handleNoticeClick = (notice: Notification) => {
  notice.read = true
  // 这里可以添加跳转或其他处理逻辑
}

// 切换标签
const handleTabChange = (name: string) => {
  activeTab.value = name
}

// 查看更多
const viewMore = () => {
  // 跳转到通知中心页面
}
</script>

<style scoped>
.notification-container {
  max-height: 500px;
  display: flex;
  flex-direction: column;
}

.notification-header {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
}

.notification-list {
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f5f5f5;
}

.notification-item.unread {
  background-color: #e6f4ff;
}

.notification-item.unread:hover {
  background-color: #e6f4ff;
}

.notice-icon {
  font-size: 20px;
  margin-top: 2px;
}

.notice-icon.info { color: #2080f0; }
.notice-icon.success { color: #18a058; }
.notice-icon.warning { color: #f0a020; }
.notice-icon.error { color: #d03050; }

.notice-content {
  flex: 1;
}

.notice-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.notice-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.notice-time {
  color: #999;
  font-size: 12px;
}

.notification-footer {
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}
</style> 
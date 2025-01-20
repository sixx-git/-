<template>
  <n-layout has-sider position="absolute">
    <!-- 侧边栏 -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <!-- Logo -->
      <div class="logo">
        <div class="logo-content">
          <span class="logo-icon">🚦</span>
          <h2 v-show="!collapsed">交通管理系统</h2>
        </div>
      </div>

      <!-- 菜单 -->
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <!-- 主要内容区 -->
    <n-layout>
      <n-layout-header bordered>
        <div class="header">
          <!-- 左侧面包屑 -->
          <div class="header-left">
            <n-breadcrumb>
              <n-breadcrumb-item>首页</n-breadcrumb-item>
              <n-breadcrumb-item>{{ currentMenu }}</n-breadcrumb-item>
            </n-breadcrumb>
          </div>

          <!-- 右侧工具栏 -->
          <div class="header-right">
            <!-- 搜索框 -->
            <n-input-group>
              <n-input
                placeholder="搜索..."
                style="width: 300px"
              >
                <template #prefix>
                  🔍
                </template>
              </n-input>
            </n-input-group>

            <!-- 功能按钮组 -->
            <div class="header-actions">
              <notification-popover />
              
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button quaternary circle @click="toggleTheme">
                    {{ isDarkTheme ? '🌞' : '🌙' }}
                  </n-button>
                </template>
                切换主题
              </n-tooltip>

              <!-- 用户头像 -->
              <n-dropdown :options="userOptions" @select="handleUserSelect">
                <n-avatar
                  round
                  size="small"
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
              </n-dropdown>
            </div>
          </div>
        </div>
      </n-layout-header>

      <n-layout-content>
        <div class="content">
          <router-view></router-view>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { h, ref, inject } from 'vue'
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NInput,
  NInputGroup,
  NButton,
  NTooltip,
  NDropdown,
  NAvatar
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useRouter } from 'vue-router'
import NotificationPopover from '../components/NotificationPopover.vue'

const router = useRouter()
const collapsed = ref(false)
const activeKey = ref('home')
const currentMenu = ref('首页')

// 注入主题相关函数和状态
const toggleTheme = inject('toggleTheme') as () => void
const isDarkTheme = inject('isDarkTheme')

// 用户下拉菜单选项
const userOptions = [
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon('👤')
  },
  {
    label: '系统设置',
    key: 'settings',
    icon: renderIcon('⚙️')
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('🚪')
  }
]

function renderIcon(icon: string) {
  return () => h('div', { innerHTML: icon })
}

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
    icon: renderIcon('🏠')
  },
  {
    label: '头盔管理',
    key: 'helmet',
    icon: renderIcon('🪖'),
    children: [
      {
        label: '头盔列表',
        key: 'helmet-list'
      },
      {
        label: '头盔分配',
        key: 'helmet-assignment'
      }
    ]
  },
  {
    label: '系统管理',
    key: 'system',
    icon: renderIcon('⚙️'),
    children: [
      {
        label: '用户管理',
        key: 'user-management'
      },
      {
        label: '系统设置',
        key: 'system-settings'
      }
    ]
  }
]

const handleMenuClick = (key: string) => {
  activeKey.value = key
  const menuItem = findMenuItemByKey(menuOptions, key)
  if (menuItem) {
    currentMenu.value = menuItem.label as string
    router.push({ name: key })
  }
}

const handleUserSelect = (key: string) => {
  switch (key) {
    case 'logout':
      console.log('logout')
      break
    case 'profile':
      router.push({ name: 'profile' })
      break
    case 'settings':
      router.push({ name: 'settings' })
      break
  }
}

// 递归查找菜单项
const findMenuItemByKey = (items: MenuOption[], key: string): MenuOption | null => {
  for (const item of items) {
    if (item.key === key) return item
    if (item.children) {
      const found = findMenuItemByKey(item.children, key)
      if (found) return found
    }
  }
  return null
}
</script>

<style scoped>
.logo {
  height: 64px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 24px;
}

.logo h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #2080f0;
  white-space: nowrap;
}

.header {
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.content {
  padding: 16px;
  background-color: #f5f7f9;
  min-height: calc(100vh - 64px);
}
</style> 
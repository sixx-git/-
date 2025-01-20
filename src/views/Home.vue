<template>
  <div class="dashboard">
    <!-- 欢迎卡片 -->
    <n-card class="welcome-card">
      <div class="welcome-content">
        <div class="welcome-info">
          <h2>早安，{{ userInfo.name }} 👋</h2>
          <p class="subtitle">今天是个适合巡检的好天气！</p>
          <div class="quick-stats">
            <div class="stat-item">
              <div class="stat-value">28</div>
              <div class="stat-label">今日任务</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">92%</div>
              <div class="stat-label">完成率</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">5</div>
              <div class="stat-label">待处理</div>
            </div>
          </div>
        </div>
        <div class="welcome-chart">
          <n-progress
            type="circle"
            :percentage="75"
            :color="progressColor"
            :rail-color="progressRailColor"
            :height="120"
          >
            <div class="progress-info">
              <div class="progress-value">75%</div>
              <div class="progress-label">工作进度</div>
            </div>
          </n-progress>
        </div>
      </div>
    </n-card>

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <n-grid :cols="4" :x-gap="12">
        <n-grid-item v-for="action in quickActions" :key="action.key">
          <n-card class="action-card" hoverable @click="handleQuickAction(action.key)">
            <div class="action-content">
              <div class="action-icon" :style="{ backgroundColor: action.color + '15' }">
                <span class="icon" :style="{ color: action.color }">{{ action.icon }}</span>
              </div>
              <div class="action-info">
                <h3>{{ action.title }}</h3>
                <p>{{ action.desc }}</p>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>

    <!-- 数据概览 -->
    <div class="data-overview">
      <n-grid :cols="3" :x-gap="12">
        <!-- 头盔状态 -->
        <n-grid-item>
          <n-card title="头盔状态" class="overview-card">
            <div class="helmet-stats">
              <div v-for="stat in helmetStats" :key="stat.key" class="helmet-stat-item">
                <div class="stat-icon" :style="{ backgroundColor: stat.color + '15' }">
                  {{ stat.icon }}
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- 巡检数据 -->
        <n-grid-item>
          <n-card title="巡检数据" class="overview-card">
            <div class="inspection-data">
              <n-data-table
                :columns="inspectionColumns"
                :data="inspectionData"
                :pagination="false"
                :bordered="false"
              />
            </div>
          </n-card>
        </n-grid-item>

        <!-- 实时监控 -->
        <n-grid-item>
          <n-card title="实时监控" class="overview-card">
            <n-list>
              <n-list-item v-for="item in monitoringList" :key="item.id">
                <n-thing :title="item.title" :description="item.time">
                  <template #avatar>
                    <div class="status-icon" :class="item.status">{{ item.icon }}</div>
                  </template>
                  <template #description>
                    <div class="monitor-info">
                      <span>{{ item.location }}</span>
                      <n-tag :type="item.status" size="small">{{ item.statusText }}</n-tag>
                    </div>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>

    <!-- 告警信息 -->
    <div class="alert-section">
      <n-card title="告警信息">
        <n-timeline>
          <n-timeline-item
            v-for="alert in alertList"
            :key="alert.id"
            :type="alert.type"
            :title="alert.title"
            :content="alert.content"
            :time="alert.time"
          />
        </n-timeline>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, computed, ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

// 用户信息
const userInfo = ref({
  name: '管理员',
  avatar: 'https://example.com/avatar.jpg'
})

// 进度条颜色
const progressColor = computed(() => '#2080f0')
const progressRailColor = computed(() => '#eef2f7')

// 快捷操作
const quickActions = [
  {
    key: 'task',
    title: '发起任务',
    desc: '快速创建巡检任务',
    icon: '📋',
    color: '#4CAF50'
  },
  {
    key: 'helmet',
    title: '头盔管理',
    desc: '查看头盔状态',
    icon: '🪖',
    color: '#2196F3'
  },
  {
    key: 'report',
    title: '生成报告',
    desc: '导出数据报告',
    icon: '📊',
    color: '#9C27B0'
  },
  {
    key: 'alert',
    title: '告警处理',
    desc: '处理异常情况',
    icon: '⚠️',
    color: '#FF9800'
  }
]

// 头盔状态统计
const helmetStats = [
  { key: 'online', label: '在线', value: 42, icon: '🟢', color: '#4CAF50' },
  { key: 'offline', label: '离线', value: 8, icon: '⚫', color: '#9E9E9E' },
  { key: 'warning', label: '异常', value: 3, icon: '⚠️', color: '#FF9800' }
]

// 巡检数据表格配置
const inspectionColumns = [
  { title: '区域', key: 'area' },
  { title: '完成率', key: 'completion' },
  { title: '状态', key: 'status' }
]

// 巡检数据
const inspectionData = [
  { area: '南区', completion: '95%', status: '正常' },
  { area: '北区', completion: '87%', status: '正常' },
  { area: '东区', completion: '76%', status: '异常' }
]

// 实时监控列表
const monitoringList = [
  {
    id: 1,
    title: '头盔#A2103',
    location: '广州市天河区',
    time: '2分钟前',
    status: 'success',
    statusText: '正常',
    icon: '🟢'
  },
  {
    id: 2,
    title: '头盔#B1587',
    location: '广州市越秀区',
    time: '5分钟前',
    status: 'warning',
    statusText: '低电量',
    icon: '⚠️'
  }
]

// 告警信息
const alertList = [
  {
    id: 1,
    type: 'error',
    title: '设备离线告警',
    content: '头盔#C2234在广州市荔湾区信号异常',
    time: '10分钟前'
  },
  {
    id: 2,
    type: 'warning',
    title: '电量不足提醒',
    content: '头盔#A1103电量低于20%',
    time: '15分钟前'
  }
]

// 处理快捷操作点击
const handleQuickAction = (key: string) => {
  message.success(`点击了${key}操作`)
}
</script>

<style scoped>
.dashboard {
  padding: 24px;
  background-color: #f5f7f9;
  min-height: 100vh;
}

.welcome-card {
  margin-bottom: 24px;
  background: linear-gradient(135deg, #1a73e8 0%, #165db5 100%);
  color: white;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-info h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.subtitle {
  margin: 8px 0 24px;
  opacity: 0.8;
}

.quick-stats {
  display: flex;
  gap: 48px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.welcome-chart {
  background: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 8px;
}

.progress-info {
  text-align: center;
}

.progress-value {
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
}

.progress-label {
  font-size: 14px;
  opacity: 0.8;
  margin-top: 4px;
}

.quick-actions {
  margin-bottom: 24px;
}

.action-card {
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-4px);
}

.action-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon .icon {
  font-size: 24px;
}

.action-info h3 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
}

.action-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.data-overview {
  margin-bottom: 24px;
}

.overview-card {
  height: 100%;
}

.helmet-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.helmet-stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.monitor-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.status-icon.warning {
  background-color: rgba(255, 152, 0, 0.1);
  color: #FF9800;
}

.status-icon.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: #F44336;
}
</style> 
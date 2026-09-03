import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSourceStore = defineStore('source', () => {
  const source = ref([
    {
      id: 'resource',
      label: '资源目录',
      children: [
        {
          id: 'nature',
          label: '自然资源',
          children: [
            {
              id: 'earthquake',
              label: '最新地震发生分布',
              type: 'point'
            },
            {
              id: 'landslide',
              label: '泥石流',
              type: 'point'
            },
            {
              id: 'river',
              label: '河流分布',
              type: 'line'
            },
            {
              id: 'mountain',
              label: '山脉分布',
              type: 'line'
            },
            {
              id: 'forest',
              label: '森林分布',
              type: 'polygon'
            },
            {
              id: 'lake',
              label: '湖泊分布',
              type: 'polygon'
            }
          ],
        },
        {
          id: 'human',
          label: '人文资源',
          children: [
            {
              id: 'city',
              label: '城市分布',
              type: 'point'
            },
            {
              id: 'town',
              label: '乡镇分布',
              type: 'point'
            },
            {
              id: 'village',
              label: '村庄分布',
              type: 'point'
            },
            {
              id: 'school',
              label: '学校分布',
              type: 'point'
            },
            {
              id: 'hospital',
              label: '医院分布',
              type: 'point'
            }
          ]
        }
      ],
    },
    {
      id: 'upload',
      label: '上传目录',
      children: [],
    },
    {
      id: 'paint',
      label: '勾画目录',
      children: [],
    },
  ])

  return { source }
})

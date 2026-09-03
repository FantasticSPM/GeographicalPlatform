import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSourceStore = defineStore('source', () => {
  const source = ref([
    {
      id: 'resource',
      name: '资源目录',
      children: [
        {
          id: 'nature',
          name: '自然资源',
          children: [
            {
              id: 'earthquake',
              name: '最新地震发生分布',
              type: 'point'
            },
            {
              id: 'landslide',
              name: '泥石流',
              type: 'point'
            },
            {
              id: 'river',
              name: '河流分布',
              type: 'line'
            },
            {
              id: 'mountain',
              name: '山脉分布',
              type: 'line'
            },
            {
              id: 'forest',
              name: '森林分布',
              type: 'polygon'
            },
            {
              id: 'lake',
              name: '湖泊分布',
              type: 'polygon'
            }
          ],
        },
        {
          id: 'human',
          name: '人文资源',
          children: [
            {
              id: 'city',
              name: '城市分布',
              type: 'point'
            },
            {
              id: 'town',
              name: '乡镇分布',
              type: 'point'
            },
            {
              id: 'village',
              name: '村庄分布',
              type: 'point'
            },
            {
              id: 'school',
              name: '学校分布',
              type: 'point'
            },
            {
              id: 'hospital',
              name: '医院分布',
              type: 'point'
            }
          ]
        }
      ],
    },
    {
      id: 'upload',
      name: '上传目录',
      children: [],
    },
    {
      id: 'paint',
      name: '勾画目录',
      children: [],
    },
  ])

  function addSource(id, data) {
    const sourceItem = source.value.find(item => item.id === id)
    if (sourceItem) {
      sourceItem.children.push({
        ...data
      })
    }
  }

  function removeSource(id, childId) {
    const sourceItem = source.value.find(item => item.id === id)
    if (sourceItem) {
      const index = sourceItem.children.findIndex(item => item.id === childId)
      if (index !== -1) {
        sourceItem.children.splice(index, 1)
      }
    }
  }

  return { source, addSource, removeSource }
})

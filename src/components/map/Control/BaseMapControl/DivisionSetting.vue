<template>
    <el-dialog v-model="visiable">
        <el-form :rules="rules" :model="data" ref="form">
            <el-form-item label="区划类型:" prop="type">
                <el-radio-group v-model="data.type">
                    <el-radio :value="levelMap.COUNTRY">全国</el-radio>
                    <el-radio :value="levelMap.PROVINCE">省级</el-radio>
                    <el-radio :value="levelMap.CITY">地市</el-radio>
                    <el-radio :value="levelMap.COUNTY">区县</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="省级名称:" v-if="![levelMap.COUNTRY].includes(data.type) && provinceOptions.length > 0"
                prop="province">
                <el-select v-model="data.province" placeholder="请选择省级区划" @change="handleProvinceChange">
                    <el-option v-for="i in provinceOptions" :key="i.code" :label="i.name" :value="i.code"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="地市名称:"
                v-if="![levelMap.COUNTRY, levelMap.PROVINCE].includes(data.type) && cityOptions.length > 0" prop="city">
                <el-select v-model="data.city" placeholder="请选择地市区划" @change="handleCityChange">
                    <el-option v-for="i in cityOptions" :key="i.code" :label="i.name" :value="i.code"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="区县名称:"
                v-if="![levelMap.COUNTRY, levelMap.PROVINCE, levelMap.CITY].includes(data.type) && countyOptions.length > 0"
                prop="county">
                <el-select v-model="data.county" placeholder="请选择区县区划">
                    <el-option v-for="i in countyOptions" :key="i.code" :label="i.name" :value="i.code"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否显示详细区划:" v-if="![levelMap.COUNTY].includes(data.type)">
                <el-switch v-model="data.details" />
            </el-form-item>

            <el-form-item label="详细级别:" v-if="data.details && ![levelMap.COUNTY].includes(data.type)" prop="level">
                <el-radio-group v-model="data.level">
                    <el-radio :value="levelMap.PROVINCE" v-if="[levelMap.COUNTRY].includes(data.type)">省级</el-radio>
                    <el-radio :value="levelMap.CITY"
                        v-if="[levelMap.COUNTRY, levelMap.PROVINCE].includes(data.type)">地市</el-radio>
                    <el-radio :value="levelMap.COUNTY"
                        v-if="[levelMap.COUNTRY, levelMap.PROVINCE, levelMap.CITY].includes(data.type)">区县</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="visiable = false">取消</el-button>
                <el-button type="primary" @click="submit">应用</el-button>
            </div>
        </template>
    </el-dialog>
</template>


<script setup>
import levelData from '@/assets/data/level.json'
import { ref, computed, watch } from 'vue'
import { ElLoading } from 'element-plus'
import { levelMap } from '@/utils/constants'
const visiable = defineModel()

const props = defineProps({
    setting: {
        type: Object,
        default: () => ({
            type: levelMap.COUNTRY,
            province: '',
            city: '',
            county: '',
            details: false,
            level: levelMap.PROVINCE
        })
    }
})
const data = ref({
    ...props.setting
})

const form = ref(null)

watch(() => data.value.type, (val) => {
    if (val === levelMap.COUNTRY) data.value.level = levelMap.PROVINCE
    if (val === levelMap.PROVINCE) data.value.level = levelMap.CITY
    if (val === levelMap.CITY) data.value.level = levelMap.COUNTY
    if (val === levelMap.COUNTY) data.value.level = levelMap.COUNTY
})

const provinceOptions = levelData.map(i => {
    return {
        name: i.n,
        code: i.c,
        level: levelMap.PROVINCE,
    }
})

function handleProvinceChange() {
    data.value.city = ''
    data.value.county = ''

}

function handleCityChange() {
    data.value.county = ''
}

const cityOptions = computed(() => {
    const province = levelData.find(i => i.c === data.value.province)
    if (!province) return []
    return province.d.map(i => {
        return {
            name: i.n,
            code: i.c,
            level: levelMap.CITY,
        }
    })
})

const countyOptions = computed(() => {
    const province = levelData.find(i => i.c === data.value.province)
    if (!province || !province.d) return []
    const city = province.d.find(i => i.c === data.value.city)
    if (!city || !city.d) return []
    return city.d.map(i => {
        return {
            name: i.n,
            code: i.c,
            level: levelMap.COUNTY,
        }
    })
})

const rules = {
    type: [
        { required: true, message: '请选择区划类型', trigger: 'change' }
    ],
    province: [
        { required: true, message: '请选择省级区划', trigger: 'change' }
    ],
    city: [
        { required: true, message: '请选择地市区划', trigger: 'change' }
    ],
    county: [
        { required: true, message: '请选择区县区划', trigger: 'change' }
    ],
    level: [
        { required: true, message: '请选择详细级别', trigger: 'change' }
    ]

}

const emit = defineEmits(['submit'])

function submit() {
    form.value.validate(async (valid) => {
        if (valid) {
            let code
            const type = data.value.type
            const level = data.value.level
            if (type === levelMap.COUNTRY) {
                if (!data.value.details) {
                    code = '100000'
                } else if (level === levelMap.PROVINCE) {
                    code = '100000_full'
                } else if (level === levelMap.CITY) {
                    code = '100000_full_city'
                }
            } else if (type === levelMap.PROVINCE) {
                if (!data.value.details) {
                    code = data.value.province
                } else if (level === levelMap.CITY) {
                    code = data.value.province + '_full'
                } else if (level === levelMap.COUNTY) {
                    code = data.value.province + '_full_district'
                }
            } else if (type === levelMap.CITY) {
                if (!data.value.details) {
                    code = data.value.city
                } else if (level === levelMap.COUNTY) {
                    code = data.value.city + '_full'
                }
            } else if (type === levelMap.COUNTY) {
                code = data.value.county
            }
            emit('submit', code)
            visiable.value = false
        } else {
            return false
        }
    })
}
</script>
<template>
    <el-dialog v-model="visible" class="division-setting-dialog" width="min(520px, calc(100vw - 24px))"
        :close-on-click-modal="false" append-to-body>
        <template #header>
            <div class="dialog-title">
                <el-icon aria-hidden="true">
                    <MapLocation />
                </el-icon>
                <span>行政区划设置</span>
            </div>
        </template>

        <el-form ref="form" class="division-form" :model="data" :rules="rules" label-position="left" label-width="84px"
            size="small" @submit.prevent="submit">
            <section class="setting-group" aria-labelledby="division-scope-title">
                <h3 id="division-scope-title" class="setting-group__title">显示范围</h3>
                <div class="setting-group__body">
                    <el-form-item label="区划级别" prop="type">
                        <el-radio-group v-model="data.type" class="level-selector" @change="handleTypeChange">
                            <el-radio-button v-for="option in typeOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item v-if="data.type !== levelMap.COUNTRY" label="省级区划" prop="province">
                        <el-select v-model="data.province" filterable placeholder="请选择省、自治区或直辖市"
                            @change="handleProvinceChange">
                            <el-option v-for="option in provinceOptions" :key="option.code" :label="option.name"
                                :value="option.code" />
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        v-if="(data.type === levelMap.CITY || (data.type === levelMap.COUNTY && !isDirectCountyProvince)) && cityOptions.length"
                        label="地市区划" prop="city">
                        <el-select v-model="data.city" filterable placeholder="请选择地级行政区" @change="handleCityChange">
                            <el-option v-for="option in cityOptions" :key="option.code" :label="option.name"
                                :value="option.code" />
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="data.type === levelMap.COUNTY && countyOptions.length" label="区县区划"
                        prop="county">
                        <el-select v-model="data.county" filterable placeholder="请选择区县级行政区">
                            <el-option v-for="option in countyOptions" :key="option.code" :label="option.name"
                                :value="option.code" />
                        </el-select>
                    </el-form-item>
                </div>
            </section>

            <section class="setting-group" aria-labelledby="division-detail-title">
                <h3 id="division-detail-title" class="setting-group__title">边界明细</h3>
                <div class="setting-group__body">
                    <el-form-item label="下级边界" class="details-field">
                        <el-checkbox v-model="data.details" :disabled="data.type === levelMap.COUNTY"
                            @change="handleDetailsChange">
                            显示下级行政区划
                        </el-checkbox>
                    </el-form-item>

                    <el-form-item v-if="data.details && detailLevelOptions.length" label="显示至" prop="level">
                        <el-radio-group v-model="data.level" class="detail-selector">
                            <el-radio-button v-for="option in detailLevelOptions" :key="option.value"
                                :value="option.value">
                                {{ option.label }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </section>

            <div class="setting-status" aria-live="polite">
                <span class="setting-status__label">当前配置</span>
                <el-icon aria-hidden="true">
                    <ArrowRight />
                </el-icon>
                <strong>{{ settingSummary }}</strong>
            </div>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button size="small" @click="reset">重置</el-button>
                <div class="dialog-footer__actions">
                    <el-button size="small" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="small" @click="submit">确定</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { ArrowRight, MapLocation } from '@element-plus/icons-vue'
import levelData from '@/assets/data/level.json'
import { levelMap } from '@/utils/constants'

const visible = defineModel()

const props = defineProps({
    setting: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['submit'])
const form = ref(null)

const defaultSetting = {
    type: levelMap.COUNTRY,
    province: '',
    city: '',
    county: '',
    details: false,
    level: levelMap.PROVINCE
}

const typeOptions = [
    { label: '全国', value: levelMap.COUNTRY },
    { label: '省级', value: levelMap.PROVINCE },
    { label: '地市', value: levelMap.CITY },
    { label: '区县', value: levelMap.COUNTY }
]

const levelLabels = {
    [levelMap.COUNTRY]: '全国',
    [levelMap.PROVINCE]: '省级',
    [levelMap.CITY]: '地市',
    [levelMap.COUNTY]: '区县'
}

const createSetting = (setting) => ({
    ...defaultSetting,
    ...(setting || {})
})

const data = ref(createSetting(props.setting))

const provinceOptions = levelData.map((item) => ({
    name: item.n,
    code: item.c
}))

const selectedProvince = computed(() => levelData.find((item) => item.c === data.value.province))

const isDirectCountyProvince = computed(() => {
    const children = selectedProvince.value?.d || []
    return children.length > 0 && children.every((item) => !item.d?.length)
})

const cityOptions = computed(() => (selectedProvince.value?.d || []).map((item) => ({
    name: item.n,
    code: item.c
})))

const selectedCity = computed(() => selectedProvince.value?.d?.find((item) => item.c === data.value.city))

const countyOptions = computed(() => {
    const options = isDirectCountyProvince.value ? selectedProvince.value?.d : selectedCity.value?.d
    return (options || []).map((item) => ({
        name: item.n,
        code: item.c
    }))
})

const detailLevelOptions = computed(() => {
    const options = {
        [levelMap.COUNTRY]: [
            { label: '省级', value: levelMap.PROVINCE },
            { label: '地市', value: levelMap.CITY }
        ],
        [levelMap.PROVINCE]: [
            { label: '地市', value: levelMap.CITY },
            { label: '区县', value: levelMap.COUNTY }
        ],
        [levelMap.CITY]: [
            { label: '区县', value: levelMap.COUNTY }
        ]
    }

    return options[data.value.type] || []
})

const settingSummary = computed(() => {
    let scope = '全国'

    if (data.value.type === levelMap.PROVINCE) {
        scope = selectedProvince.value?.n || '未选择省级区划'
    } else if (data.value.type === levelMap.CITY) {
        scope = selectedCity.value?.n || '未选择地市区划'
    } else if (data.value.type === levelMap.COUNTY) {
        const county = countyOptions.value.find((item) => item.code === data.value.county)
        scope = county?.n || '未选择区县区划'
    }

    const detail = data.value.details ? `，显示至${levelLabels[data.value.level]}` : ''
    return `${scope}${detail}`
})

const rules = {
    type: [{ required: true, message: '请选择区划级别', trigger: 'change' }],
    province: [{ required: true, message: '请选择省级区划', trigger: 'change' }],
    city: [{ required: true, message: '请选择地市区划', trigger: 'change' }],
    county: [{ required: true, message: '请选择区县区划', trigger: 'change' }],
    level: [{ required: true, message: '请选择下级显示层级', trigger: 'change' }]
}

function handleTypeChange(type) {
    if (type === levelMap.COUNTRY) {
        data.value.province = ''
    }
    if (type <= levelMap.PROVINCE) {
        data.value.city = ''
    }
    if (type <= levelMap.CITY) {
        data.value.county = ''
    }

    data.value.level = detailLevelOptions.value[0]?.value || levelMap.COUNTY
    if (type === levelMap.COUNTY) data.value.details = false
    form.value?.clearValidate()
}

function handleProvinceChange() {
    data.value.city = ''
    data.value.county = ''
    form.value?.clearValidate(['city', 'county'])
}

function handleCityChange() {
    data.value.county = ''
    form.value?.clearValidate('county')
}

function handleDetailsChange(enabled) {
    if (!enabled) {
        form.value?.clearValidate('level')
        return
    }

    if (!detailLevelOptions.value.some((option) => option.value === data.value.level)) {
        data.value.level = detailLevelOptions.value[0]?.value
    }
}

function reset() {
    data.value = createSetting()
    form.value?.clearValidate()
}

function getDivisionCode() {
    const { type, details, level, province, city, county } = data.value

    if (type === levelMap.COUNTRY) {
        if (!details) return '100000'
        return level === levelMap.PROVINCE ? '100000_full' : '100000_full_city'
    }
    if (type === levelMap.PROVINCE) {
        if (!details) return province
        return level === levelMap.CITY ? `${province}_full` : `${province}_full_district`
    }
    if (type === levelMap.CITY) {
        return details ? `${city}_full` : city
    }
    return county
}

async function submit() {
    const valid = await form.value?.validate().catch(() => false)
    if (!valid) return

    emit('submit', getDivisionCode())
    visible.value = false
}
</script>

<style scoped lang="scss">
:global(.division-setting-dialog) {
    --division-blue: #1769aa;
    --division-ink: #263746;
    --division-muted: #677784;
    --division-line: #cbd2d8;
    --division-surface: #f4f5f6;

    overflow: hidden;
    padding: 0;
    border: 1px solid #929da6;
    border-radius: 2px;
    background-color: var(--division-surface);
    box-shadow: 0 8px 28px rgba(16, 31, 44, 0.32);
}

:global(.division-setting-dialog .el-dialog__header) {
    display: flex;
    height: 40px;
    align-items: center;
    margin: 0;
    padding: 0 42px 0 12px;
    border-bottom: 1px solid #b8c0c7;
    background-color: #e7eaed;
}

:global(.division-setting-dialog .el-dialog__headerbtn) {
    top: 0;
    width: 40px;
    height: 40px;
}

:global(.division-setting-dialog .el-dialog__close) {
    color: #4d5b66;
    font-size: 16px;
}

:global(.division-setting-dialog .el-dialog__headerbtn:hover) {
    background-color: #dce1e5;
}

:global(.division-setting-dialog .el-dialog__body) {
    padding: 14px;
    background-color: var(--division-surface);
}

:global(.division-setting-dialog .el-dialog__footer) {
    padding: 8px 12px;
    border-top: 1px solid #c4cbd1;
    background-color: #e9ecef;
}

.dialog-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #253642;
    font-size: 13px;
    font-weight: 600;
}

.dialog-title .el-icon {
    color: var(--division-blue);
    font-size: 16px;
}

.division-form {
    color: var(--division-ink);
}

.setting-group {
    border: 1px solid var(--division-line);
    background-color: #fff;
}

.setting-group+.setting-group {
    margin-top: 10px;
}

.setting-group__title {
    height: 30px;
    margin: 0;
    padding: 0 10px;
    border-bottom: 1px solid var(--division-line);
    color: #354754;
    background-color: #edf0f2;
    font-size: 12px;
    font-weight: 600;
    line-height: 29px;
}

.setting-group__body {
    padding: 12px 12px 4px;
}

.division-form :deep(.el-form-item) {
    margin-bottom: 9px;
}

.division-form :deep(.el-form-item__label) {
    height: 30px;
    padding-right: 12px;
    color: #465865;
    font-size: 12px;
    line-height: 30px;
}

.division-form :deep(.el-form-item__content) {
    min-height: 30px;
    line-height: 30px;
}

.division-form :deep(.el-select) {
    width: 100%;
}

.division-form :deep(.el-select__wrapper) {
    min-height: 30px;
    border: 1px solid #b9c2c9;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: none;
}

.division-form :deep(.el-select__wrapper:hover) {
    border-color: #7f9db2;
}

.division-form :deep(.el-select__wrapper.is-focused) {
    border-color: var(--division-blue);
    box-shadow: 0 0 0 1px rgba(23, 105, 170, 0.2);
}

.division-form :deep(.el-select__selected-item),
.division-form :deep(.el-select__placeholder) {
    font-size: 12px;
}

.level-selector,
.detail-selector {
    display: flex;
    width: 100%;
}

.level-selector :deep(.el-radio-button),
.detail-selector :deep(.el-radio-button) {
    flex: 1 1 0;
}

.level-selector :deep(.el-radio-button__inner),
.detail-selector :deep(.el-radio-button__inner) {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    border-color: #b9c2c9;
    border-radius: 0;
    color: #405462;
    background-color: #f8f9fa;
    box-shadow: none;
    font-size: 12px;
    line-height: 28px;
}

.level-selector :deep(.el-radio-button:first-child .el-radio-button__inner),
.detail-selector :deep(.el-radio-button:first-child .el-radio-button__inner) {
    border-radius: 2px 0 0 2px;
}

.level-selector :deep(.el-radio-button:last-child .el-radio-button__inner),
.detail-selector :deep(.el-radio-button:last-child .el-radio-button__inner) {
    border-radius: 0 2px 2px 0;
}

.level-selector :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner),
.detail-selector :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
    border-color: var(--division-blue);
    color: #fff;
    background-color: var(--division-blue);
    box-shadow: -1px 0 0 0 var(--division-blue);
}

.details-field :deep(.el-checkbox) {
    height: 30px;
}

.details-field :deep(.el-checkbox__inner) {
    border-color: #9ca8b1;
    border-radius: 1px;
}

.details-field :deep(.el-checkbox__label) {
    padding-left: 7px;
    color: #405462;
    font-size: 12px;
}

.setting-status {
    display: flex;
    min-height: 30px;
    align-items: center;
    gap: 7px;
    margin-top: 10px;
    padding: 5px 9px;
    overflow: hidden;
    border: 1px solid #c8d1d8;
    color: var(--division-muted);
    background-color: #eef3f6;
    font-size: 11px;
}

.setting-status__label,
.setting-status .el-icon {
    flex: 0 0 auto;
}

.setting-status .el-icon {
    color: #82919c;
    font-size: 12px;
}

.setting-status strong {
    min-width: 0;
    overflow: hidden;
    color: #304857;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dialog-footer,
.dialog-footer__actions {
    display: flex;
    align-items: center;
}

.dialog-footer {
    justify-content: space-between;
}

.dialog-footer__actions {
    gap: 6px;
}

.dialog-footer :deep(.el-button) {
    min-width: 68px;
    height: 28px;
    margin: 0;
    border-color: #aeb8c0;
    border-radius: 2px;
    font-size: 12px;
}

.dialog-footer :deep(.el-button--primary) {
    border-color: var(--division-blue);
    background-color: var(--division-blue);
}

@media (max-width: 480px) {
    :global(.division-setting-dialog .el-dialog__body) {
        padding: 10px;
    }

    .setting-group__body {
        padding: 10px 9px 3px;
    }

    .division-form :deep(.el-form-item) {
        display: block;
    }

    .division-form :deep(.el-form-item__label) {
        width: auto !important;
        height: 24px;
        line-height: 24px;
    }

    .division-form :deep(.el-form-item__content) {
        margin-left: 0 !important;
    }
}
</style>

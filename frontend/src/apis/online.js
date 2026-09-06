import axios from 'axios'

// 通过adcode获取区划数据
export const apiGetDistrictByAdcode = (code) => {
    return axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/geojson`, {
        params: {
            code
        }
    })
}

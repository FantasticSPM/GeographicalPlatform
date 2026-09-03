// 加载geojson数据
export function handleGeojson(map, data, id = 'uploaded-geojson', styleMap = {}) {
    const geometryType = judgeGeojsonType(data)
    let style = styleMap[geometryType] ?? {}
    map.addSource(id, {
        type: 'geojson',
        data: data
    })

    if (geometryType === 'polygon') {
        map.addLayer({
            id,
            type: 'fill',
            source: id,
            layout: {},
            paint: {
                'fill-color': style.color ?? '#007acc',
                'fill-opacity': style.opacity ?? 0.5
            }
        })
        map.addLayer({
            id: id + '_other',
            type: 'line',
            source: id,
            layout: {},
            paint: {
                "line-color": style.color ?? '#fff',
                "line-width": style.width ?? 1,
            },
        })
    } else if (geometryType === 'line') {
        map.addLayer({
            id,
            type: 'line',
            source: id,
            layout: {},
            paint: {
                "line-color": style.color ?? '#fff',
                "line-width": style.width ?? 1,
            },
        })
    } else if (geometryType === 'point') {
        map.addLayer({
            id,
            type: 'circle',
            source: id,
            paint: {
                'circle-radius': style.radius ?? 5,
                'circle-color': style.color ?? '#007acc',
            }
        })
    }

    locateData(map, id)
    return {
        id,
        geometryType,
        color: style.color
    }
}

// 判断数据类型
export function judgeGeojsonType(data) {
    if (data.type === 'FeatureCollection') {
        return unitType(data.features[0].geometry.type)
    } else if (data.type === 'Feature') {
        return unitType(data.geometry.type)
    } else {
        return unitType(data.type)
    }

    function unitType(type) {
        if (type === 'MultiPolygon' || type === 'Polygon') {
            return 'polygon'
        } else if (type === 'MultiLineString' || type === 'LineString') {
            return 'line'
        } else if (type === 'MultiPoint' || type === 'Point') {
            return 'point'
        }
    }
}

// 移除数据
export function removeData(map, id) {
    if (!map) return
    if (!hasData(map, id)) return
    map.removeLayer(id)
    map.getLayer(id + '_other') && map.removeLayer(id + '_other')
    map.removeSource(id)
}

// 定位数据
export function locateData(map, id) {
    if (!hasData(map, id)) return
    const source = map.getSource(id)
    if (!source) return
    source.getBounds().then((bounds) => {
        map.fitBounds(bounds, { padding: 20 })
    })
}


// 判读数据是否加载
export function hasData(map, id) {
    return map.getSource(id) !== undefined
}

// 修改数据颜色
export function changeColor(map, id, color) {
    if (!hasData(map, id)) return
    const source = map.getSource(id)
    const type = judgeGeojsonType(source._data.geojson)
    map.setPaintProperty(
        id,
        type === 'polygon' ? 'fill-color' :
            type === 'line' ? 'line-color' :
                'circle-color', color
    )
}
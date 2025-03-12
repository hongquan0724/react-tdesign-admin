
import 'ol/ol.css';
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM';
import { fromLonLat } from "ol/proj";
import {useEffect, useRef, useState} from "react";
import { Style, Fill, Stroke, Circle as sCircle } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import * as olProj from "ol/proj.js";
import {Button, Input, MessagePlugin, SelectInput, Space} from "tdesign-react";
import './OpenLayers.less'
import {SearchIcon} from "tdesign-icons-react";

const classStyles = `
<style>
.tdesign-demo__select-input-ul-autocomplete {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tdesign-demo__select-input-ul-autocomplete > li {
  display: block;
  border-radius: 3px;
  line-height: 22px;
  cursor: pointer;
  padding: 3px 8px;
  color: var(--td-text-color-primary);
  transition: background-color 0.2s linear;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tdesign-demo__select-input-ul-autocomplete > li:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
`;
let selectAddr = {}
function OpenLayers(){
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [options, setOptions] = useState([]);
    const [markerLayer, setMarkerLayer] = useState(null);
    const [map, setMap] = useState(null);
    // 杭州的经纬度（EPSG:4326）
    const hangzhouLonLat = [120.19, 30.26];
    let centerPos = fromLonLat(hangzhouLonLat);
    // openlayers将会渲染进这个div
    const mapElement = useRef()
    useEffect(()=>{
        const initialMap  = new Map({
            view: new View({
                center: centerPos,//地图中心位置
                zoom: 10,//地图初始层级
                maxZoom: 15,
                minZoom: 9
            }),
            layers: [],
            target: mapElement.current
        });
        let tileLayer = new TileLayer({
            source: new OSM()
        });
        initialMap.addLayer(tileLayer)

        // 添加示例代码所需样式
        document.head.insertAdjacentHTML('beforeend', classStyles);
        setMap(initialMap);
        setMarker(initialMap)
        return () => initialMap.setTarget(undefined);
    },[])
    const setMarker = (initialMap) => {
        const _style = new Style({
            image: new sCircle({
                radius: 10,
                stroke: new Stroke({
                    color: '#fff',
                }),
                fill: new Fill({
                    color: '#3399CC',
                }),
            }),
        });
        const _feature = new Feature({
            geometry: new Point(olProj.fromLonLat(hangzhouLonLat)),
        });
        _feature.setStyle(_style);
        const _marker = new VectorLayer({
            source: new VectorSource({
                features: [_feature],
            }),
        });
        initialMap.addLayer(_marker);
    };
    // 地理编码函数（使用 Nominatim）
    const geocode = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data,'keyword');
        // if (data.length > 0) {
        //     const { lat, lon } = data[0];
        //     return [parseFloat(lon), parseFloat(lat)]; // 返回 [经度, 纬度]
        // }
        return data;
    };
    const onInputChange = (keyword) => {
        console.log(keyword,'keyword');
        setSelectValue(keyword)
        geocode(keyword).then((result)=>{
            setOptions(result);
            setPopupVisible(true);
            selectAddr = {}
        })
    }
    const onOptionClick = (item) => {
        selectAddr = item;
        setSelectValue(item.display_name);
        setPopupVisible(false);
    };
    const search = () => {
        if(Object.keys(selectAddr).length > 0){
            const { lat, lon } = selectAddr;
            const coords = [parseFloat(lon), parseFloat(lat)]
            // 移除旧的标记
            if (markerLayer) {
                map.removeLayer(markerLayer);
            }
            console.log(coords);
            // 添加新标记
            const marker = new Feature({
                geometry: new Point(fromLonLat(coords)),
            });
            marker.setStyle(
                new Style({
                    image: new sCircle({
                        radius: 10,
                        stroke: new Stroke({
                            color: '#fff',
                        }),
                        fill: new Fill({
                            color: '#3399CC',
                        }),
                    }),
                })
            );

            const vectorSource = new VectorSource({
                features: [marker],
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });

            map.addLayer(vectorLayer);
            setMarkerLayer(vectorLayer);

            // 定位到新坐标
            map.getView().setCenter(fromLonLat(coords));
            map.getView().setZoom(12);
        }else {
            MessagePlugin.warning('未找到该地点，请重试！');
        }
    }
    return (<div className='OpenLayers-container'>
            <div className="search-box">
                <Space>
                    <SelectInput
                        style={{width:'200px'}}
                        value={selectValue}
                        popupVisible={popupVisible}
                        placeholder="请输入任意关键词"
                        allowInput
                        clearable
                        onInputChange={onInputChange}
                        panel={
                            <ul className="tdesign-demo__select-input-ul-autocomplete">
                                {options.map((item) => (
                                    <li key={item} onClick={() => onOptionClick(item)}>
                                        {item.display_name}
                                    </li>
                                ))}
                            </ul>
                        }
                        suffixIcon={<SearchIcon/>}
                    />
                    <Button type="primary" onClick={search}>搜索</Button>
                </Space>
            </div>
            <div ref={mapElement} style={{ width: '100%', height: '99%' }} >
            </div>;
        </div>)

}


export default OpenLayers;
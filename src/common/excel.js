
import ExcelJS from "exceljs";
import {downloadFromUrl} from './utils.js'
function tableToExport({fileName, headerCols = [], body = [],fileType='xlsx'}) {
    return new Promise((resolve, reject) => {
        try {
            const _workbook = new ExcelJS.Workbook();
            _workbook.creator = 'template';
            _workbook.lastModifiedBy = 'template';
            _workbook.created = new Date(); //创建时间
            _workbook.properties.date1904 = true; //1904计时系统 避免Mac异常
            _workbook.calcProperties.fullCalcOnLoad = true; //强制刷新计算
            const _defaultRowHeight = 32;
            const sheet = _workbook.addWorksheet('Sheet1');
            sheet.properties.defaultRowHeight = _defaultRowHeight;
            if(fileType !=='txt') {
                const _columns = []
                headerCols.forEach(col => {
                    const _tempObj = {
                        header: col.title,
                        key: col.colKey,
                        width: parseInt(col.width) / 8,
                    }
                    _columns.push(_tempObj);
                })
                sheet.columns = _columns;
                //表格主体数据
                body.forEach((row) => {
                    const _newObj = {};
                    _columns.forEach(col => {
                        _newObj[col.key] = row[col.key];
                    })
                    sheet.addRow(_newObj);
                })
                _workbook.modified = new Date(); //修改时间时间
                _workbook.xlsx.writeBuffer().then(response => {
                    const _blob = new Blob([response]);
                    downloadFromUrl(URL.createObjectURL(_blob), "_blank", `${fileName}.${fileType}`);
                    resolve();
                }, reason => {
                    console.error("导出失败", reason);
                    reject("导出失败" + reason);
                });
            }else {
                let txtContent = '';
                headerCols.forEach(col => {
                    txtContent += col.title + '\t'; // 使用制表符分隔
                })
                    txtContent += '\n'; // 换行
                //表格主体数据
                body.forEach((row) => {
                    headerCols.forEach(col => {
                        txtContent += row[col.colKey] + '\t'; // 使用制表符分隔
                    })
                    txtContent += '\n'; // 换行
                })
                // 创建并下载TXT文件
                const _blob = new Blob([txtContent], { type: 'text/plain' });
                downloadFromUrl(URL.createObjectURL(_blob), "_blank", `${fileName}.${fileType}`);
                resolve();
            }
        } catch (e) {
            console.error(e);
            reject("导出Excel失败");
        }
    })
}
export {tableToExport};
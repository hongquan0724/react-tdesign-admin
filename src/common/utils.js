import JSZip from 'jszip'

function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
/**
 * 从文件Url中下载文件
 * 须能直接访问（只能为GET/Bolb）
 * @param url 文件地址
 * @param target 打开窗口目标，默认新窗口
 * @param fileName 文件名（在chrome上只有服务器不指定文件名时才有效）
 */
function downloadFromUrl(url, target = "_blank", fileName) {
    if (document.getElementById("downloadingTheFile") !== null) {
        setTimeout(() => {
            downloadFromUrl(url, target, fileName);
        }, parseInt(("" + Math.random()).split(".").pop()) % 500);
    }
    const _link = document.createElement("a");
    if (fileName !== undefined && fileName !== null) {
        _link.download = fileName;
    }
    _link.id = "downloadingTheFile";
    _link.target = target;
    _link.href = url;
    document.body.appendChild(_link);
    _link.click();
    document.body.removeChild(_link);
}
function export_txt_to_zip(th, jsonData, txtName, zipName) {
    const zip = new JSZip()
    const txt_name = txtName || 'default'
    const zip_name = zipName || 'default'
    const data = jsonData
    let txtData = `${th}\r\n`
    data.forEach((row) => {
        let tempStr = ''
        tempStr = row.toString()
        txtData += `${tempStr}\r\n`
    })
    zip.file(`${txt_name}.txt`, txtData)
    zip.generateAsync({
        type: "blob"
    }).then((blob) => {
        downloadFromUrl(blob, '_blank',`${zip_name}.zip`)
    }, (err) => {
        alert('导出失败')
    })
}

export {toThousandFilter, downloadFromUrl,export_txt_to_zip}

/*
 * @Author: liuduan
 * @Date: 2019-12-05 20:33:07
 * @LastEditors: liuduan
 * @LastEditTime: 2019-12-05 20:38:39
 * @Description: 下载文件模块
 */

// url: 下载资源的 url, https协议
export default function downloadFile(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            success: (res) => {
                const {
                    statusCode,
                    tempFilePath,
                } = res;

                if (statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success: (data) => {
                            resolve(data);
                        },
                        fail: (e) => {
                            reject(e);
                        },
                    });
                } else {
                    reject(res);
                }
            },
            fail: (e) => {
                reject(e);
            },
        });
    });
}

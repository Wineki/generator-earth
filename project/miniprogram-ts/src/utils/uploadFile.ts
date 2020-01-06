/*
 * @Author: liuduan
 * @Date: 2019-12-04 10:53:03
 * @LastEditors: liuduan
 * @LastEditTime: 2019-12-06 10:31:39
 * @Description: 微信小程序上传文件到wos功能(图片、视频上传)
 */

/**
 * 小程序sdk-teg负责人：
 * FE：张玉 zhangyu88、乔纯美 qiaochunmei
 * RD: 李延朋 liyanpeng01
 */

/**
 * 问题 - 2019.12.04
 * 1. 上传进度回调没执行？回复：目前v1版本sdk不支持上传进度，如有需要，需要找产品联系sundong02进行需求排期
 * 2. 测试环境上传大文件失败 响应code -1？回复：待测试环境搭建好后验证，用线上配置测试，大文件上传通过(teg还是没有搭建测试环境上传大文件服务)
 * 3. 响应参数 access_url 和 url 有区别吗？回复：2个字段当前无差别，但是teg建议使用access_url
*/

/**
 * wos配置参数获取说明：
 *
 * 1. 需要先在 <http://wos.58corp.com/app/apply> 上申请wos app 参数
 * 2. 美事找`zhouhuameng`同学发送如下message，再次申请步骤1
 *      业务具体使用场景（文件类型，谁上传，谁下载等）： 图片、视频文件上传
 *      单个文件大小：0-30M 根据业务需求而定(备注：小程序中最大上传文件为30M)
 *      预估每日数据增量：16000个文件-找产品经理确认
 *      应用类型（内网还是外网）：外网
 *      https需求: 是
 *      使用哪种sdk：微信小程序-根据自己的情况而定
 *      删除需求：否
 *      覆盖需求：是
 *      读写属性(公有，私有)：私有读、公有写-需要和产品确认
 *      bucket名称：factoryinsure-名字自己取一个就行，不能有大写字母
 * 3. `zhouhuameng`同学会帮忙申请下来测试环境配置参数，先使用测试环境配置参数测试，测试没问题后再找`zhouhuameng`同学获取线上配置参数
 * 4. 申请线上app，wos部门同学审批通过后，在我的WOS中申请Bucket
 */


const WosSysSdk = require('../lib/wos_jssdk_v1.js');
const { fetchWithLogin } = require('./fetch');
const { getUid } = require('./util');


const bucket = 'factoryinsure';

/* ---------------- 开发、测试环境 参数配置 ----------------- */
// 在wos上申请的app参数
const appid = 'NPLoJiHgFeNsq';
const sid = '0TXcTze6nG9iv5jnrE2vrHthjsQpYXXe';

// 小文件wosurl
const smallwosurl = 'https://cdntestv3.58v5.cn';
// 大文件wosurl
const bigwosurl = 'https://cdntestv3.58v5.cn';
// token 获取服务地址
const tokenServer = 'https://test.58.com/nodewosauth';


/* -------------------- 线上环境 参数配置 ------------------ */
// 在wos上申请的app参数
// const appid = 'HiFeDcBaHqP';
// const sid = 'R2Lw3m0fs0ToIg2w9fdmDFMDcKlF3C1A';

// // 线上小文件wosurl
// const smallwosurl = 'https://wos.58.com';
// // 大文件wosurl
// const bigwosurl = 'https://wosp2.58.com';
// // token 获取服务地址
// const tokenServer = 'https://test.58.com/nodewosauth';


/* --------------------- 上传wos配置参数 ------------------- */
const ttl = 0; // 文件过期时间，0为不设置，单位为小时，最小值168（7天）
const insertOnly = 1; // insertOnly==0 表示允许覆盖文件 1表示不允许覆盖


// 请求鉴权接口
function getToken(filename: string) {
    const now = parseInt(`${new Date().getTime() / 1000}`);
    const e = now + 1800; // 签名过期时间为当前+180s
    const url = `${tokenServer}/${appid}/${sid}/${bucket}/${encodeURIComponent(filename)}/${e}`;

    // 这里请求token不需要loading显示
    return fetchWithLogin.get(url, {}, { loading: false });
}


// 初始化wos，获取鉴权token
function initWos(filename: string) {
    const WosSys = new WosSysSdk({
        appid: appid, // APPID 必填参数
        bucket: bucket, // bucketName 必填参数
        smallwosurl: smallwosurl, // 小文件wos的url 必填参数
        bigwosurl: bigwosurl, // 大文件wos的url 必填参数
        getAppSign(callback: any) { // 获取签名 必填参数
            // sig就是业务方返回的token正常情况下是不能写死的，为了测试可以暂时写死
            // 搭建一个业务自己的鉴权服务器，做业务相关的鉴权，例如校验登录态等，校验通过后请求WOS的TokenServer获取签名
            // 'token.wos.58dns.org' 线上环境-获取token鉴权地址
            // 'tokentest.wos.58dns.org'测试环境-获取token鉴权地址
            getToken(filename)
                .then((res: any) => {
                    // TODO: 这里需要根据业务接口code值判断是否请求成功，注意：必须使用encodeURIComponent encode token值，否则可能报错
                    if (res.code !== 0) {
                        throw new Error(res.message);
                    }

                    const sig = res.data.token;

                    callback(encodeURIComponent(sig));
                })
                .catch(() => {
                    callback('');
                });
        },
    });

    // WosSys.on('upload', (a: any) => {
    //     console.log('upload event', a);
    // });

    return WosSys;
}


function setUUID(UUID: string) {
    wx.setStorage({
        key: 'uuid',
        data: UUID,
    });
}


/**
 * @description: 上传文件方法
 * @param {String}} tempFilePath: 必传 小程序选择文件api返回的本地文件临时路径
 * @param {String}} 上传文件后缀: 非必传
 * @param {Function}} onProgress: 非必传 上传文件进度回调方法，
 * @param {Boolean}} isReadPublic: 非必传 是否是公有读，默认是公有读，即读文件地址不许要获取token
 * @return: Promise<any>
 */
export default function uploadFile(tempFilePath: string, suffix?: string, onProgress?: (e: any) => any, isReadPublic = true): Promise<any> {
    return new Promise((resolve, reject) => {
        // 获取系统信息
        wx.getSystemInfo({

            // 获取系统信息成功
            success(sysRes) {
                const UUID = getUid();

                setUUID(UUID);
                // wx.removeStorage({
                //   key: 'key',
                //   success: function(res) {
                //     console.log(res.data)
                //   }
                // })
                wx.getStorage({
                    key: 'uuid',
                    success(result) {
                        if (!(result.data)) {
                            setUUID(UUID);
                        }
                    },
                    fail() {
                        setUUID(UUID);
                    },
                });

                // 获取文件信息
                wx.getFileInfo({

                    filePath: tempFilePath,
                    digestAlgorithm: 'sha1',

                    // 获取文件信息成功
                    success(rs) {
                        const IMEI = '';
                        const MAC = '';
                        const AndroidID = '';
                        const IDFA = '';
                        const openudid = '';
                        const { brand } = sysRes;
                        const { model } = sysRes;
                        const system = sysRes.system.split(' ');
                        const os = system[0];
                        const osver = system[1];
                        const ip = '';
                        const cpu = '';
                        const SdkVersion = '1.0.0';
                        const brower = '';
                        const BrowserVersion = '';
                        const { version } = sysRes;
                        // eslint-disable-next-line max-len
                        const wosdevinfo = `${UUID}#${IMEI}#${MAC}#${AndroidID}#${IDFA}#${openudid}#${brand}#${model}#${os}#${osver}#${ip}#${cpu}#${SdkVersion}#${brower}#${BrowserVersion}#${version}`;
                        const nameArr = tempFilePath.split('.');

                        // 设置上传文件名，注意：拼接符合不能有`.`，否则报错
                        const filename = `${nameArr[nameArr.length - 2]}_${UUID}_${suffix || nameArr[nameArr.length - 1] || ''}`;

                        // 初始化wos对象
                        const WosSys = initWos(filename);

                        console.log('------------wos请求参数------------', {
                            filePath: tempFilePath, // filename需要业务方根据自己的需求进行处理一下
                            bucketName: bucket,
                            remotePath: filename, // filename添加个时间戳是因为有的文件会重名，需要业务方自己处理一下哈
                            ttl: ttl,
                            insertOnly: insertOnly,
                            wosdevinfo: wosdevinfo,
                        });

                        // const alias = filename + '_' + new Date().getTime();
                        const opt = {
                            filePath: tempFilePath, // filename需要业务方根据自己的需求进行处理一下
                            bucketName: bucket,
                            remotePath: filename, // filename添加个时间戳是因为有的文件会重名，需要业务方自己处理一下哈
                            ttl: ttl,
                            insertOnly: insertOnly,
                            wosdevinfo: wosdevinfo,
                            // taskReady: taskReady,
                            // optSliceSize: sliceSize,
                            // alias: alias, // 文件别名
                            onUploadProgress: (e: any) => {
                                // v1 版本sdk未支持进度回调功能
                                onProgress && onProgress(e);
                            },
                            onUploadSuccess: (response: IAnyObject) => {
                                let _response = response;

                                // 图片上传成功响应内容，需要转换下
                                if (response.statusCode === 200) {
                                    try {
                                        _response = JSON.parse(response.data);
                                    } catch (e) {
                                        reject(e);

                                        return;
                                    }
                                }

                                // 上传成功响应内容
                                if (_response.code !== 0) {
                                    reject(_response);

                                    return;
                                }

                                // 回显文件url
                                const showUrl = _response.data.access_url || _response.data.url;

                                // 公有读直接返回文件access_url
                                if (isReadPublic) {
                                    resolve(showUrl);

                                    return;
                                }

                                // 如果是私有读，需要再获取token，本项目为公有读
                                getToken(filename)
                                    .then((r: any) => {
                                        resolve(`${showUrl}?token=${encodeURIComponent(r.data.token)}`);
                                    })
                                    .catch((e: any) => {
                                        reject(e);
                                    });
                            },
                            onUploadError: (e: any) => {
                                reject(e);
                            },
                        };

                        // console.log('rs>>>>getFileInfo', rs);
                        WosSys.upload(rs, opt);
                    },

                    // 获取文件信息失败
                    fail(e) {
                        reject(e);
                    },
                });
            },

            // 获取系统信息失败
            fail(e) {
                reject(e);
            },

        });
    });
}


/**
 * @description: 图片压缩
 * @param {String} tempFilePath: 必传 小程序选择文件api返回的本地文件临时路径
 * @param {Number} originSize: 必传 原始图片大小
 * @param {Number} quality: 必传 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）
 * @return: Promise<{size, filePath}>
 */
export function compressImage(tempFilePath: string, originSize: number, quality: number = 80): Promise<object> {
    const tmpArr = tempFilePath.match(/.([a-zA-Z]+)$/);

    const suffix = tmpArr ? tmpArr[1] : 'jpg';

    return new Promise((resolve) => {
        wx.compressImage({
            src: tempFilePath,
            quality,
            success(res) {
                wx.getFileInfo({

                    filePath: res.tempFilePath,
                    digestAlgorithm: 'sha1',

                    // 获取文件信息成功
                    success({ size }) {
                        resolve({
                            size,
                            filePath: res.tempFilePath,
                            suffix,
                        });
                    },

                    // 获取文件信息失败
                    fail() {
                        resolve({
                            size: originSize,
                            filePath: tempFilePath,
                            suffix,
                        });
                    },

                });
            },

            // 压缩失败
            fail() {
                resolve({
                    size: originSize,
                    filePath: tempFilePath,
                    suffix,
                });
            },
        });
    });
}

import uploadFile, { compressImage } from '../../utils/uploadFile';


interface IFileProps {
    url: string;
    tempFilePath?: string;
    loading?: boolean;
    error?: boolean;
    isImage?: boolean;
}

interface IData {
    currentFiles: IFileProps[];
}

Component<any, IData, any>({
    options: {
        multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    },

    externalClasses: ['my-class'],

    properties: {
        // 图片列表
        files: {
            type: Array, // string[]
            value: [],
            observer(newVal: string[]) {
                const currentFiles = newVal.map((url: string) => {
                    // 正则匹配识别是否是图片
                    const isImage = RegExp('.+(?:png|jpg|jpeg|webp|gif|bmp|tif)$|^data:image', 'i').test(url);

                    return {
                        url,
                        loading: false,
                        error: false,
                        isImage,
                    };
                });

                this.setData({ currentFiles });
            },
        },
        // 单次最大可上传图片数量
        maxCount: {
            type: Number,
            value: 9,
        },
        // 最大可上传文件大小，默认30M，小程序最大上传文件大小是30M
        maxSize: {
            type: Number,
            value: 30 * 1024 * 1024,
        },
        // 是否只读
        readonly: {
            type: Boolean,
            value: false,
        },
        // 上传文件类型
        types: {
            type: Array, // string[]，如需支持视频播放则可设置 ['image', 'video']
            value: ['image'],
        },

        // 顶部标题
        title: String,

        // 副标题
        subTitle: String,

        // 底部tip
        tip: String,
    },

    data: {
        currentFiles: [],
    },

    methods: {
        // 预览照片
        previewImage(e: any) {
            const { currentFiles } = this.data;
            const { index } = e.currentTarget.dataset;

            const urls: string[] = [];

            currentFiles.forEach((file: IFileProps) => {
                if (file.isImage) {
                    urls.push(file.url);
                }
            });

            wx.previewImage({
                current: currentFiles[index].url, // 当前显示图片的http链接
                urls,
            });
        },

        // 播放全屏视频
        onTapVideo(e: any) {
            const { id } = e.currentTarget.dataset;

            if (!id) return;

            this.videoContext = wx.createVideoContext(id, this);

            this.videoContext.requestFullScreen();
        },

        // 视频全屏状态改变
        fullScreenVideoChange(e: any) {
            const { fullScreen } = e.detail;

            if (!fullScreen && this.videoContext) {
                this.videoContext.pause();
            }
        },

        // 删除文件操作
        deleteFile(e: any) {
            const { currentFiles } = this.data;
            const { index } = e.currentTarget.dataset;

            currentFiles.splice(index, 1);

            this.setData({ currentFiles });
        },

        // 选择文件
        chooseFile() {
            const {
                types,
            } = this.properties;
            const needImage = types.indexOf('image') !== -1;
            const needVideo = types.indexOf('video') !== -1;

            // 1. 判断是否需要有选择视频功能
            if (needImage && needVideo) {
                wx.showActionSheet({
                    itemList: ['上传图片', '上传视频'],
                    success: (res) => {
                        switch (res.tapIndex) {
                            case 0:
                                this.chooseImage();
                                break;
                            case 1:
                                this.chooseVideo();
                                break;

                            default:
                                break;
                        }
                    },
                });

                return;
            }

            if (needImage) {
                this.chooseImage();

                return;
            }

            if (needVideo) {
                this.chooseVideo();
            }
        },

        // 选择照片
        chooseImage() {
            const {
                maxCount,
                maxSize,
            } = this.properties;
            const { currentFiles } = this.data;

            wx.chooseImage({
                count: maxCount,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: async (res) => {
                    try {
                        const {
                            tempFiles, // 图片的本地临时文件列表
                            tempFilePaths, // 图片的本地临时文件路径列表
                        } = res;

                        // 压缩图片
                        const cpList = tempFilePaths.map((tempFilePath, index) => compressImage(tempFilePath, tempFiles[index].size));
                        const filesAfterCompress: any[] = await Promise.all(cpList);


                        // 标记无效图片索引
                        const invalidFile = filesAfterCompress.find(item => item.size > maxSize);

                        // 1. 阻止无效图片上传
                        if (invalidFile && !this.checkFileSize(invalidFile.size)) return;

                        // 获取文件管理器，用于将文件二进制流转为base64
                        const fileManager = wx.getFileSystemManager(); // getFileSystemManager-文件管理器，读取本地文件内容，get file content list，是一个ArrayBuffer(541182)列表

                        // 2. 上传图片
                        filesAfterCompress.forEach(({ filePath, suffix }) => {
                            const newFile: IFileProps = {
                                url: '',
                                loading: true,
                                error: false,
                                isImage: true,
                            };

                            currentFiles.push(newFile);

                            // 2.1 将上传状态变为显示loading
                            this.setData({ currentFiles });

                            uploadFile(filePath, suffix)
                                .then((url: string) => {
                                    newFile.url = url;
                                    newFile.error = false;
                                })
                                .catch(() => {
                                    // 将上传文件从二进制流转为base64，在错误情况下帮助预览
                                    const base64String = wx.arrayBufferToBase64(fileManager.readFileSync(filePath));

                                    newFile.url = `data:image/${suffix};base64,${base64String}`;
                                    newFile.error = true;
                                })
                                .then(() => {
                                    newFile.loading = false;

                                    // 2.2 更新状态状态为上传成功或失败，关闭loading显示
                                    this.setData({ currentFiles });
                                });
                        });
                    } catch (e) {
                        wx.showModal({
                            title: '上传失败',
                            content: e.message,
                        });
                    }
                },
                fail: this.chooseFileError.bind(this),
            });
        },

        // 选择视频，wx.chooseVideo 每次只能选择一个视频
        chooseVideo() {
            const { currentFiles } = this.data;

            wx.chooseVideo({
                sourceType: ['album', 'camera'], // 视频选择的来源
                compressed: true, // 是否压缩所选择的视频文件
                maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒，注意：仅仅对拍摄视频生效，对相册中视频无效
                camera: 'back', // back or front 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效
                success: (res) => {
                    const {
                        tempFilePath,
                        size,
                    } = res;

                    // 检查文件大小不能超过30M
                    if (!this.checkFileSize(size)) return;

                    const newFile: IFileProps = {
                        url: '',
                        loading: true,
                        error: false,
                        isImage: false,
                    };

                    currentFiles.push(newFile);

                    // 2.1 将上传状态变为显示loading
                    this.setData({ currentFiles });

                    // 上传视频文件
                    uploadFile(tempFilePath)
                        .then((url: string) => {
                            newFile.url = url;
                            newFile.error = false;
                        })
                        .catch(() => {
                            newFile.error = true;
                        })
                        .then(() => {
                            newFile.loading = false;

                            // 2.2 更新状态状态为上传成功或失败，关闭loading显示
                            this.setData({ currentFiles });
                        });
                },
                fail: this.chooseFileError.bind(this),
            });
        },

        // 检查文件大小是否符合要求
        checkFileSize(size: number) {
            const {
                maxSize,
            } = this.properties;

            if (size > maxSize) {
                wx.showModal({
                    title: '提示',
                    content: `上传文件不能超过${Math.round(maxSize / 1024 / 1024)}M`,
                });

                return false;
            }

            return true;
        },

        // 处理选择文件错误
        chooseFileError(e: wx.GeneralCallbackResult) {
            if (/cancel/.test(e.errMsg)) return;

            wx.showModal({
                title: '选择文件失败',
                content: e.errMsg,
            });
        },

        // 提交文件路径列表到应用page
        submitFile() {
            const { currentFiles } = this.data;

            const files = [];

            let flag = true;

            for (let i = 0, l = currentFiles.length; i < l; i++) {
                const {
                    url,
                    loading,
                    error,
                } = currentFiles[i];

                if (loading) {
                    flag = false;

                    break;
                }

                if (!error) {
                    files.push(url);
                }
            }

            if (!flag) {
                wx.showToast({
                    title: '文件上传中，请稍后重试',
                    icon: 'none',
                });

                return;
            }

            this.triggerEvent('change', { files });
        },

    },
});

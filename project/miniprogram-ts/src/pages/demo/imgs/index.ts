Page({

    data: {
        title: '车损照片上传',
        tip: '上传图片大小为5M，支持jpg。',
        readonly: false,
        types: ['image', 'video'],
        files: ['https://avatar.csdnimg.cn/A/6/7/3_hjc256.jpg', 'http://testv2.wos.58v5.cn/NPLoJiHgFeNsq/factoryinsure/OoU42QfkDgD5a9446c70c42cc5620152a14dcd23c99a_8eaeca60-185b-456d-a7e3-4b646083d92e_mp4'],
    },

    // 点击提交按钮，返回文件url列表string[]
    onChange(e: any) {
        console.log('onChange', e.detail.files);
    },
});

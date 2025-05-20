<template>
    <div class="page full">
        <div class="page__hd">
            <div class="visitorHeader">
                <p>{{renderData.visitor.name}}您好</p>
                <p>{{renderData.inviterDept}}的{{renderData.inviterName}}现邀请您于{{renderData.visitStartTime | timeFilter}}到访。为来访当日顺利通行，请补充一下信息:</p>
            </div>
            <div class="staff-head all-center" id="uploader">
                <van-uploader :before-read="beforeRead" :after-read="afterRead" v-model="fileList" :max-count="1" :deletable="true">
                </van-uploader>
            </div>
        </div>
        <div class="page__bd">
            <!-- <div style="margin: 0" class="weui-cells">
                <div class="weui-cell weui-cell_active" id="js_cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label"><span class="color-red">*</span>身份证号</label>
                    </div>
                    <div class="weui-cell__bd weui-flex">
                        <input id="idCard" class="weui-input" autofocus type="text" v-model="idCard" emptyTips="身份证号不能为空" pattern="[0-9]*" maxlength="18"/>
                    </div>
                </div>
            </div> -->
            <!-- 随行人员卡片 -->
            <div v-if="visitorList.length > 0">
                <div class="entourageCard" v-for="(item, index) in visitorList" :key='index'>
                    <div class="cross" @click="cancel(index)"><img src="@/assets/images/叉.png"></div>
                    <hr style="height: 10px; background: rgba(0,0,0,0.1); border: none;">
                    <h3>随行人员{{index + 1}}</h3>
                    <van-field v-model="item.name" maxlength='32' label="姓名" required/>
                    <!-- <div class="selectOneCard">
                        <span><span class="color-red" style="margin-right: 2px">*</span>性别</span>
                        <van-radio-group v-model="item.gender" direction="horizontal">
                            <van-radio :name='1'>男</van-radio>
                            <van-radio :name='2'>女</van-radio>
                        </van-radio-group>
                    </div> -->
                    <van-field required v-model="item.phoneNo" maxlength='11' type="tel" label="手机号" />
                    <van-field required v-model="item.certNo" maxlength='18' label="身份证号" />
                </div>
            </div>
            <div class="addIcon" @click="addPeople" v-if="showAddBtn"><img src="@/assets/images/加.png"></div>
            <div class="subIcon" @click="submit">提交</div>
            <div class="bigtissue" v-if="showIsuue">
                <!-- 这个是提示信息，tag -->
                <p>点击这里添加访客</p>
                <span @click="closeAnyTag">知道了</span>
                <span class="daosanjiao"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import weui from 'weui.js'
    import { Toast } from 'vant'
    import axios from 'axios'
    import openApi from '@/api/openApi.js'
    import moment from 'moment'
    import { Base64 } from 'js-base64'
    // 图片压缩工具类
    import {compressImage} from '@/utils/CompressImageUtils.js'
    export default {
        mounted() {
            // this.queryVisitor(this.$route.query.visitorId)
            document.getElementsByTagName('title')[0].textContent = this.navPath
            this.visitorId = Base64.decode(this.$route.params.visitorId)

            this.queryVisitor()
        },
        data() {
            return {
                navPath: '访客邀请',
                faceUrl: '',
                idCard: '',
                fileList: [],
                visitorList: [],
                // 渲染数据
                renderData: {
                    visitor: {
                        name : ''
                    }
                },
                showIsuue: true,
                visitorId: '',
                showAddBtn: true,
                entourageNum: ''
            }
        },
        methods: {
            closeAnyTag() {
                this.showIsuue = false
            },
            beforeRead(file) {
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/pjpeg' || file.type === 'image/jpg') {
                    return true;
                }
                Toast.fail('请上传图片格式文件');
                return false;
            },
            // 获取基础信息之部门,编制等
            afterRead(file) {
                // console.log(navigator.userAgent)
            // 图片压缩上传 安卓才压 苹果不压
                // if((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) ||(navigator.userAgent.indexOf('iPad') != -1)) {
                    // console.log('苹果上传')
                const fd = new FormData();
                file.status = 'uploading';
                file.message = '上传中...';
                fd.append('face', file.file);
                axios({
                url: '/hvm-app/visitorNoCas/facePhoto/upload',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: fd
                }).then(res =>{
                    file.status = '';
                    file.message = '';
                    if(res.data.code == 0) {
                        if(res.data.data.faceScore < 60) {
                            Toast('请上传清晰的人脸')
                            this.clearFace()
                        } else {
                            this.faceUrl = res.data.data.uuid
                        }
                    } else {
                        Toast('请上传人脸正面免冠照')
                        this.clearFace()
                    }
                }).catch(err => {
                    this.clearFace()
                    Toast.fail('人脸不合格')
                })
                // } else {
                // 压缩图片
                //     console.log('安卓上传')
                //     compressImage(file.content).then(result => {
                //         const fd = new FormData();
                //         file.status = 'uploading';
                //         file.message = '上传中...';
                //         fd.append('face', result);
                //         axios({
                //         url: '/hvm-app/visitorNoCas/facePhoto/upload',
                //         method: 'post',
                //         headers: {
                //             'Content-Type': 'multipart/form-data'
                //         },
                //         data: fd
                //         }).then(res =>{
                //             file.status = '';
                //             file.message = '';
                //             if(res.data.code == 0) {
                //                 if(res.data.data.faceScore < 50) {
                //                     Toast('请上传清晰的人脸')
                //                     this.clearFace()
                //                 } else {
                //                     this.faceUrl = res.data.data.uuid
                //                 }
                //             } else {
                //                 Toast('请上传人脸正面免冠照')
                //                 this.clearFace()
                //             }
                //         }).catch(err => {
                //             this.clearFace()
                //             Toast.fail('人脸不合格')
                //         })
                //     })
                // }
            },
            // 清空人脸图片
            clearFace() {
                this.faceUrl = '',
                this.fileList = []
            },
            addPeople() {
                this.showIsuue = false
                if(this.visitorList.length < this.entourageNum) {
                    this.visitorList.unshift({
                        name: '',
                        phoneNo: '',
                        certNo: '',
                        gender: null
                    })
                } else {
                    Toast('已经超过申请人数')
                }
            },
            // 查询访客信息
            queryVisitor() {
                axios({
                    url: `/hvm-app/visitorNoCas/visitor/information`, 
                    data:{visitorId: this.visitorId}, 
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    method: 'post'
                }).then(res => {
                    if(res.data.code == 0){
                        this.renderData = res.data.data
                        this.entourageNum = res.data.data.entourageNum
                        // 获取访客人数，为0则隐藏，否则增加
                        if(res.data.data.entourageNum > 0) {
                            for(let i = 0; i < res.data.data.entourageNum; i++) {
                                this.addPeople()
                            }
                        } else {
                            this.showAddBtn = false
                        }
                    }
                }).catch(err => {})
            },
            // 提交访客申请
            submitVisitor() {
                if(this.fileList.length <= 0 || this.faceUrl == '') {
                    Toast.fail('请上传人脸照片');
                } else {
                    axios({
                        url: `/hvm-app/visitorNoCas/visitor/supplement`,
                        method: 'post',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data:{
                            "certNo": this.idCard,
                            "entourages": this.visitorList,
                            "face": this.faceUrl,
                            "visitorId": this.visitorId
                        }, 
                    }).then(res => {
                        if(res.data.code == 0) {
                            Toast.success('提交成功');
                            this.$router.replace('/empty')
                        } else {
                            Toast.fail(res.data.msg)
                        }
                    }).catch( err => {
                        Toast.fail(res)
                    })
                }
            },
            // 身份证验证
            regIdCard (idcard) {
                const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
                if(idcardReg.test(idcard)) {
                    return true
                } else {
                    Toast('身份证号码无效')
                    return false
                }
            },
            regOne() {
                const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
                if(this.visitorList == []) {
                    return true
                }
                for(let item in this.visitorList) {
                    if(this.visitorList[item].name != '') {
                        if(this.visitorList[item].phoneNo == '' || !phoneReg.test(this.visitorList[item].phoneNo)) {
                            Toast(this.visitorList[item].name+'的电话号码为空或者无效')
                            return false
                        }
                        if(this.visitorList[item].certNo == '' || !this.regIdCard(this.visitorList[item].certNo)) {
                            Toast(this.visitorList[item].name+'的身份证为空或者无效')
                            return false
                        }
                    } else {
                        Toast('有未填名字的随行人员卡片')
                        return false
                    }
                }
                return true
            },
            submit() {
                if(this.regOne()){
                    this.submitVisitor()
                }
            },
            cancel(index) {
                this.visitorList.splice(index,1)
            }
        },
        filters: {
            timeFilter(value) {
                return moment(value).format('YYYY年MM月DD日 HH:mm')
            }
        }
    }
</script>

<style lang="less" scoped>
    .page {
        display: flex;
        flex-direction: column;
    }
    .visitorHeader{
        padding: 16px 16px 10px 16px;
        color: #ffffff;
        p{
        font-size: 16px;
        word-break: break-all;
        }
    }
    .page__hd {
        flex-grow: 1;
        background: url("data:image/png;base64,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") no-repeat center / cover;
        .staff-head {
            border-radius: 72px;
            margin: 4px auto 15px;
            width: 100px;
            height: 100px;
            position: relative;
            color: #fff;
            /deep/.van-uploader{
                left: 4px;
                top: 0;
                .van-uploader__wrapper{
                .van-uploader__upload{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
                //图片部分
                .van-uploader__preview{
                    .van-uploader__preview-image{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    }
                }
                }
            }
            .innerP{
                position: absolute;
                top: 14px;
                width: 100%;
                text-align: center;
                color: #3890F5;
                &+.innerP{
                    top: 50px;
                    font-weight: 400;
                }
                &:first-child{
                    font-size: 30px;
                }
            }
        }
        .staff-info {
            .staff-name {
                font-size: 16px;
                line-height: 32px;
                color: #fff;
                font-weight:400;
                font-style:normal;
            }
            .staff-item {
                line-height: 32px;
                color: #f2f2f2;
                position: relative;
                /deep/ .van-icon-phone-o{
                    font-size: 16px;
                    line-height: 32px;
                    position: relative;
                    top: 3px;
                }
            }

        }

    }

    .page__bd {
        position: relative;
        flex-grow: 0;
        height: 300px;
        background-color: #ffffff;
        .entourageCard{
            position: relative;
            h3{
                padding-left: 5px;
            }
            .cross{
                width: 40px;
                height: 40px;
                position: absolute;
                right: 0;
                top: 10px;
                z-index: 99;
                img{
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -12px;
                    margin-top: -12px;
                }
            }
        }
        .entourageCard:last-child{
            margin-bottom: 70px;
        }
    }
    .addIcon{
        position: fixed;
        bottom: 80px;
        right: 8px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);;
        background: #ffffff;
        z-index: 999;
        img{
            position: absolute;
            width: 30px;
            height: 30px;
            left: 50%;
            margin-left: -15px;
            top: 50%;
            margin-top: -15px;
        }
    }
    .subIcon{
        position: fixed;
        bottom: 20px;
        right: 8px;
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #ffffff;
        font-weight: bold;
        border-radius: 50%;
        box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);;
        background: cornflowerblue;
        z-index: 999;
        &:active{
            background: #eeeeee;
        }
    }
    .submit-btn {
        position: fixed;
        bottom: 0;
        // padding-top: 42px;
        background: #ffffff;
        padding: 8px 0;
        width: 100%;
        height: 40px;
        margin: auto;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 999;
        .operate-btn{
            width: 80%;
            position: absolute;
            left: 10%;
            top: 8px;
        }
    }
    .selectOneCard{
        position: relative;
        padding: 10px 8px;
        width: 100%;
        overflow: hidden;
        span{
            float: left;
            margin-right: 60px;
        }
        /deep/ .van-radio-group--horizontal{
            width: 40%;
            float: left;
        }
        &:after{
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            right: 0;
            bottom: 0;
            left: 16px;
            border-bottom: 1px solid #ebedf0;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }
.bigtissue{
    width: 186px;
    height: 78px;
    background-color: #ffffff;
    box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;
    position: fixed;
    bottom: 70px;
    left: 50%;
    margin-left: -93px;
    text-align: center;
    p{
        font-size: 14px;
        color: rgba(0,0,0,0.70);
        line-height: 40px;
        font-weight: 500;
    }
    span{
        font-size: 14px;
        color: #2080F7;
        position: absolute;
        right: 16px;
        bottom: 12px;
    }
    .daosanjiao{
        position: absolute;
        top: 50%;
        right: -10px;
        margin-left: -2px;
	    width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
	    height: 0px;
	    border: 5px solid #ffffff;
	    border-bottom-color: transparent;    /* 设置透明背景色 */
	    border-top-color: transparent;
        border-right-color: transparent;
    }
}
</style>

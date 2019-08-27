<template>
    <div class="header">
        <nav data-role="ribbonmenu">
        <ul class="tabs-holder">
            <li class="static"><a href="#"> <span class="mif-home"></span> Static</a></li>
            <li><a href="#section-one">Main</a></li>
            <li><a href="#section-two">Button</a></li>
            <li><a href="#section-three">Setting</a></li>
        </ul>

        <div class="content-holder">
            <div class="section" id="section-one">
                <div class="group">
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>


                    <span class="title">Main Control</span>
                </div>
            </div>
            <div class="section" id="section-two">
                <div class="group">
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>


                    <span class="title">Button Control</span>
                </div>
            </div>
            <div class="section" id="section-three">
                <div class="group">
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>
                    <button class="ribbon-button">
                            <span class="icon">
                                <img  src="../../../static/img/share.jpg">
                            </span>
                        <span class="caption">Share</span>
                    </button>


                    <span class="title">Setting Control</span>
                </div>
            </div>
        </div>
    </nav>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">Logout</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import auth from '../../auth'
    export default {
        data() {
            return {
                name: 'linxin'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    auth.logout(this)
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>

<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: 'HOME'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: 'Master',
                        subs: [
                            {
                                index: 'user',
                                title: 'Kelola User'
                            },
                            {
                                index: 'service',
                                title: 'Kelola Layanan'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'ticket',
                        title: 'Ticket'
                    }
                    /*
                    {
                        icon: 'el-icon-menu',
                        index: '3',
                        title: 'Formulir',
                        subs: [
                            {
                                index: 'basetable',
                                title: 'Bentuk dasar'
                            },
                            {
                                index: 'vuetable',
                                title: 'Komponen tabel'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '4',
                        title: 'Formulir',
                        subs: [
                            {
                                index: 'baseform',
                                title: 'Bentuk Dasar'
                            },
                            {
                                index: 'vueeditor',
                                title: 'Editor'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown'
                            },
                            {
                                index: 'upload',
                                title: 'Unggah file'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: 'Bagan'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'drag',
                        title: 'Seret dan lepaskan'
                    }*/
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>

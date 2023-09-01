import React, { useState } from 'react';
import {
    HomeFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, } from 'antd';
import { useNavigate } from 'react-router-dom';
import Routes from 'pages/Routes';
const { Sider, Content } = Layout;
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { },
    } = theme.useToken();

    const navigate = useNavigate()
    return (
        <Layout  >

            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className='sidebar-header'>
                    {
                        !collapsed && <h4 className='text-white mt-3 ms-2'>Menu</h4>
                    }
                    <div className='ms-1'>

                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                color: "white",
                                marginLeft: "3px",
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </div>




                </div>

                {/* <Divider /> */}
                <div className="demo-logo-vertical  " />
                <Menu
                    className=" "
                    onClick={({ key }) => navigate(key)}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['today']}
                    items={[
                        {
                            key: '/',
                            icon: <HomeFilled />,
                            label: 'Today',
                        },
                        {
                            key: '/upcoming',
                            icon: <VideoCameraOutlined />,
                            label: 'Upcoming',
                        },
                        {
                            key: '/stickywall',
                            icon: <UploadOutlined />,
                            label: 'Stickywall',
                        },
                    ]}
                />

            </Sider>
            <Layout className='ms-3'>
                <Content
                    style={{
                        marginTop: "10px",
                        padding: 24,
                        minHeight: 280,
                        background: "white",
                    }}
                >

                    <Routes />
                </Content>
            </Layout>
        </Layout >
    );
};
export default App;
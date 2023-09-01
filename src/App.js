import "/node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import './App.scss';
import React, { useState } from 'react';
import { CopyOutlined, DoubleRightOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingFilled } from '@ant-design/icons';
import { Layout, Menu, Button, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Routes from 'pages/Routes';
import { useAuthContext } from "contexts/AuthContext";
import { useInputContext } from "contexts/InputContext";
const { Sider, Content } = Layout;
const App = () => {
  const { isAuth, dispatch } = useAuthContext()
  const [collapsed, setCollapsed] = useState(false);
  const { setTakeInputVal } = useInputContext()

  const handleLogout = () => {
    dispatch({ type: "SET_LOGGED_OUT" })
  }

  const handleChange = (e) => {
    setTakeInputVal(e.target.value)
  }

  const navigate = useNavigate()
  return (
    <Layout className="sidebar" >

      <Sider trigger={null} className="sider"
        collapsible collapsed={collapsed} style={{
          background: "#F4F4F4",
          margin: "0.5rem",
        }}>
        <div className='sidebar-header'>
          {
            !collapsed && <h4 className='text-dark mt-3 ms-2'>Menu</h4>
          }
          <div className='ms-1'>

            <Button
              className="text-dark "
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: "3px",
                fontSize: '16px',
                width: 64,
                height: 64,

              }}
            />
          </div>
        </div>
        {!isAuth ? <Link to="/auth/login" className={!collapsed && "ms-1 mt-2"} >

          <Button type="text" icon={<LoginOutlined />} size="middle">Login</Button>
        </Link> : <>
          {!collapsed && <div class="d-flex ms-1">

            <input class="form-control mr-sm-1" type="search" aria-label="Search" placeholder="Search" onChange={handleChange} style={{
              width: "130px"
            }} />
            <button class="btn btn-outline-primary my-2 my-sm-0 btn-sm" type="submit">Search</button>
          </div>}

        </>
        }


        <div className="sider-auth">
          <div>

            <div className="demo-logo-vertical  " />
            <Divider orientation="left" className="text-dark"  > Tasks</Divider>

            <Menu
              className="text-dark"
              style={{
                background: "#F4F4F4"
              }}
              onClick={({ key }) => navigate(key)}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['today']}
              items={[
                {
                  key: '/upcoming',
                  icon: <DoubleRightOutlined />,
                  label: 'Upcoming',
                },
                {
                  key: '/',
                  icon: <MenuFoldOutlined />,
                  label: 'Today',
                },

                {
                  key: '/stickywall',
                  icon: <CopyOutlined />,
                  label: 'Sticky Wall',
                },
              ]}
            />
            <Divider orientation="left" className="text-dark"  > Lists</Divider>

            <Menu
              className="text-dark"
              style={{
                background: "#F4F4F4"
              }}
              // theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[

                {
                  key: '1',
                  label: 'Personal',
                },
                {
                  key: '2',
                  label: 'Work',
                },
                {
                  key: '3',
                  label: 'List 1',
                },
              ]}
            />
          </div>
          <div>

            <Menu
              className="text-dark"
              style={{
                background: "#F4F4F4"
              }}
              // theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <SettingFilled />,
                  label: 'Setting',
                },
              ]}
            />

            {isAuth && <Button onClick={handleLogout} type="text" className={!collapsed && "ms-3"} >Logout</Button>}

          </div>
        </div>
      </Sider>
      <Layout className='ms-3'>
        <Content
          style={{
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

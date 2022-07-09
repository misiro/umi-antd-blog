import { EditOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { history, Outlet } from 'umi';

const items: MenuProps['items'] = [
  {
    label: '主页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '发表文章',
    key: '/posts/create',
    icon: <EditOutlined />,
  },
  {
    label: '登录',
    key: '/login',
    icon: <LoginOutlined />,
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('/');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    history.push(e.key);
  };

  return (
    <Layout>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Content>
        <Outlet></Outlet>
      </Content>
    </Layout>
  );
};

export default App;

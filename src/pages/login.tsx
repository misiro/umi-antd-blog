import {history} from "umi";
import {Button, Checkbox, Form, Input} from "antd";

export default function () {
    const [form] = Form.useForm()

    async function submit() {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({email: form.getFieldValue("email"), password: form.getFieldValue("password")}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status !== 200) {
                console.error(await res.text());
                return;
            }
            const data = await res.json();
            alert(`欢迎回来, ${data.name}`);
            history.push('/posts/create');
        } catch (err) {
            console.error(err);
        }
    }

    return <div className="w-full flex justify-center">
        <div className="container lg:px-64 px-8 pt-16">
            <p className="text-3xl font-extrabold">用户登录</p>
            <Form
                name="basic"
                form={form}
                initialValues={{remember: true}}
                autoComplete="off"
                onFinish={submit}
                size="large"
            >
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button className="mr-8" type="primary" htmlType="submit">
                        登入
                    </Button>
                    <Button className="mr-8" type="primary" htmlType="button"
                            onClick={() => history.push('/register')}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>;
};

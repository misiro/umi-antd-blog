import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {
        style: 'less',
        import: true,
    },
    access: {},
    model: {},
    initialState: {},
    request: {},
    npmClient: "yarn",
    apiRoute: {
        platform: "vercel",
    },
    locale: {antd: true},
    routes: [
        {path: "/", component: "index"},
        {path: "/posts/create", component: "posts/create"},
        {path: "/login", component: "login"},
        {path: "/posts/:postId", component: "posts/post"},
        {path: "/register", component: "register"},
    ],
    tailwindcss: {}
});


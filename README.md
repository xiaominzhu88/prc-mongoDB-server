# APP 运行 过程 ⌛️

# Main.js

## 第一个 button 是 insert 'Lola' 信息到 mongo, 同时 显示在前端 APP

### 1: index.js

- 连接到 mongodb，如果是 200 status，显示 connected
- 写入 object 到 mongodb， insertOne, log 出 mongo response
- 用 send 的方法 发送这个 mongo response 去 前端 App.js

### 2: App.js

- 第一个 fetch 就是 get method， 得到 index 发送过来的 mongo response data
- 用 setData 展示要显示的 data

（robo 3T 里可以看到此加入信息， 每次 click 就加入一条）

## 第二个 button 是 update mongo 里的‘Lola’ 名字

### 1: App.js

- 先 input 写入 要更改的信息， 加个 button submit 更改

- 第二个 fetch 是 post method，body 里面是要更改的 name 信息，发送这个 request 去 server

### 2: index.js

- 用 app.post 方法， 先得到 前端发来的 request 信息 req.body

- 连接到 mongoDB, 用 updateOne 方法更改 name 是'Lola' 的信息

- 所更改的内容就是 前端发来的 request 信息 req.body.name

（robo 3T 里可以看到此更新的信息， 每次 click 就更新一条）

# Insert.js

## 里面有两个 Component (Content / Info)

1. 首先 把 input 用 post 方法发送到 server， 'posts' 是 Path, button save to DB

2. 在 server 首先用 App.post（）接收到发来的 input 信息，连接 mongoDB

3. 把接收到的 信息 用 insertOne 方法发送到 mongoDB, 然后 接收 mongoDB 发回的 信息， 用 res.send() 方法 发送回 前端， 里面有 包含 '\_id'

4. 前端 用 res.json() 方法接收 server 发回的信息， 然后 render

## 所需东东

1. 复制这两个到 root

[https://hub.docker.com/](https://hub.docker.com/)

### Dockerfile

```jsx
FROM mongo:3.6.8
CMD mongod --fork --logpath /var/log/mongodb.log; \
  mongorestore /tmp/dump/; \
  mongod --shutdown; \
  docker-entrypoint.sh mongod
```

### docker-compose.yml

```jsx
version: "3.7"
services:
  mongodb_container:
    image: mongo:latest
    ports:
      - 27017:27017
    volumes:
      - mongodb_data_container:/data/db

volumes:
  mongodb_data_container:
```

### docker

### docker-compose up 启动

[https://developer.aliyun.com/article/714944?spm=a2c6h.14164896.0.0.1c745859v8aefB](https://developer.aliyun.com/article/714944?spm=a2c6h.14164896.0.0.1c745859v8aefB)

- [ ] Robo 3T create database （ Collections /test1 )

2. npx create-react-app prc 打开 新项目

- [ ] proxy 中间代理机构，可以确保请求到数据 这条指令只需要在 package.json localhost 定义 server 在哪里工作, 因为 cors 的原因

3. 后端 add express, body-parser, nodemon, mongodb

在 package.json 增加 server-start, 用来启用 nodemon server

📸

| Learn            | Note                                             |
| ---------------- | ------------------------------------------------ |
| Dockerfile       | https://hub.docker.com/                          |
| docker-compose   | docker-compose up                                |
| Robo 3T          | https://robomongo.org/                           |
| Proxy            | https://baike.baidu.com/item/proxy               |
| _ Cors _         | 跨域访问，要返回信息 可以用 proxy 解决           |
|                  | https://www.cnblogs.com/loveis715/p/4592246.html |
| _ Concurrently _ | https://www.npmjs.com/package/concurrently       |

### Dockerfile 语法

| mingling   | Note                                                                 |
| ---------- | -------------------------------------------------------------------- |
| FROM       | 基于哪个镜像（image）来实现                                          |
| MAINTAINER | 镜像 （image) 创建者                                                 |
| ENV        | 声明环境变量                                                         |
| RUN        | 执行的命令                                                           |
| ADD        | 添加宿主机文件到容器里，有需要解压的文件会自动解压                   |
| COPY       | 添加宿主机文件到容器里                                               |
| WORKDIR    | 工作目录                                                             |
| EXPOSE     | 容器内应用可使用的端口                                               |
| CMD        | 容器启动后所执行的程序，如果执行 docker run 后面跟启动命令会被覆盖掉 |
| ENTRYPOINT | 同 CMD,不会覆盖                                                      |
| VOLUME     | 将宿主机的目录挂在到容器里                                           |

4. 前端 import from react-router-dom

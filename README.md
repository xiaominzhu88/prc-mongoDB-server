docker
docker-compose

- Robo 3T create database
  proxy 中间代理机构，请求数据 package.json localhost 定义 server 在哪里工作

# -------------APP 运行 过程---------------

## 第一个 button 是 insert 'Lola' 信息到 mongo, 同时 显示在前端 APP

### 1: index.js

- 连接到 mongodb，如果是 200 status，显示 connected
- 写入 object 到 mongodb， insertOne, log 出 mongo response
- 用 send 的方法 发送这个 mongo response 去 前端 App.js

### 2: App.js

- 第一个 fetch 就是 get method， 得到 index 发送过来的 mongo response data
- 用 setData 展示要显示的 data

（robo 3T 里可以看到此加入信息， 每次 click 就加入一条）

# 第二个 button 是 update mongo 里的‘Lola’ 名字

### 1: App.js

- 先 input 写入 要更改的信息， 加个 button submit 更改

- 第二个 fetch 是 post method，body 里面是要更改的 name 信息，发送这个 request 去 server

### 2: index.js

- 用 app.post 方法， 先得到 前端发来的 request 信息 req.body

- 连接到 mongoDB, 用 updateOne 方法更改 name 是'Lola' 的信息

- 所更改的内容就是 前端发来的 request 信息 req.body.name

（robo 3T 里可以看到此更新的信息， 每次 click 就更新一条）

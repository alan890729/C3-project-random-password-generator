# Random Password Generator - 隨機密碼產生器

> A simple tool for generating random passwords.

## Table Of Contents
* [Project Snapshots](#project-snapshots)
* [Features](#features)
* [Getting Started](#getting-started)
* [Authors](#authors)

## Project Snapshots

### 操作成功

![image](https://github.com/alan890729/C3-project-random-password-generator/blob/server-render-version/public/images/start.png)
![image](https://github.com/alan890729/C3-project-random-password-generator/blob/server-render-version/public/images/password.png)

### 操作限制

操作限制包含：
- 需要輸入密碼長度且密碼長度輸入在指定範圍內
- 需要選定一個以上的字元集
- 輸入的排除字元不能排除了選中的字元集中，任意一個字元集的所有字元

![image](https://github.com/alan890729/C3-project-random-password-generator/blob/server-render-version/public/images/length-error.png)
![image](https://github.com/alan890729/C3-project-random-password-generator/blob/server-render-version/public/images/no-character-set.png)
![image](https://github.com/alan890729/C3-project-random-password-generator/blob/server-render-version/public/images/conflict.png)

## Features

1. 使用者可以設定欲產生密碼的密碼長度
2. 使用者可以選擇要在密碼裡出現的字元，包括小寫英文字母、大寫英文字母、數字、特殊符號
3. 使用者可以輸入不想要在密碼內出現的字元
4. 使用者可以按下'Generate Password'按鈕生成符合1.~3.設定條件的隨機密碼

## Getting Started

### Prerequisites
- Node.js(RTE) - v20.14.0
- [Express.js - v4.19.2](https://expressjs.com)
- [Nodemon - v3.1.4](https://www.npmjs.com/package/nodemon)
- [Bootstrap - v5.3.1](https://getbootstrap.com/docs/5.1/getting-started/download/)
- [font-awesome - v6.6.0](https://fontawesome.com/)
- [Express-handlebars - v7.1.3](https://www.npmjs.com/package/express-handlebars)

### Installing - 專案安裝流程

1. 打開terminal，輸入

    ```
    git clone https://github.com/alan890729/C3-project-random-password-generator.git
    ```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾
    ```
    cd C3-project-random-password-generator
    ```

3. 安裝 npm 套件
    ```
    npm install
    ```

4. 因為這份作業我有做兩個版本，而此版本是用學期C3教的方法（express.js、app.get()分配路由、handlebars樣板引擎功能等等）做出來的，所以要看這個版本，要把分支切換到server-render-version：

    ```
    git checkout server-render-version
    ```

5. 檢查是否已經安裝nodemon
   
    - 已有nodemon，直接輸入以下指令啟動專案
   
      ```
      npm run dev
      ```
      server會在 <http://localhost:3000> 執行
  
    - 還沒有安裝nodemon，先退回前一個路徑，在global安裝nodemon。輸入：
      ```
      npm install -g nodemon
      ```
  
      接著再回到 **C3M3-project-random-password-generator** 資料夾內，輸入：
      ```
      npm run dev
      ```
## Authors

  - [**Alpha Camp**](https://tw.alphacamp.co/) - provide this assignment.
  - [**Alan Huang**](https://github.com/alan890729)
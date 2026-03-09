# 📖 TodoList & Reflection Dashboard (待办与复盘看板)

> ✨ **A Vibe Coding Project | Vibe Coding 实践** ✨
> 
> *English: This project is the result of "vibe coding" — a spontaneous process of discovering my own needs and building a fun little toy to solve them. It's not just a todolist; it's a personalized tool crafted for my daily study routine.*
> 
> *中文：这个项目是 "vibe coding" 的产物——在一个发现自身需求的过程中，随性开发出的一个小玩具，用来解决我日常管理上的痛点。它不仅仅是一个待办事项表，更是为我量身定制的日常学习与管理工具。*

### 🎬 Demo Video (演示视频)
Check out this promotional video generated using Remotion to see the dashboard in action!
快来看看这个用 Remotion 制作的演示视频，了解看板的实际效果！

<video controls src="./demo-video.mp4" title="Demo Video" width="100%"></video>

*(If the video doesn't play inline, you can view it directly: [demo-video.mp4](./demo-video.mp4))*

---

<details open>
<summary><b>🇬🇧 English Version</b></summary>

A minimalist, Apple-inspired dashboard for students to track deadlines, manage weekly routines, and write reflections.

### 🚀 Features

*   **Dynamic Course Management**: Add and manage your enrolled units/courses, complete with custom color coding.
*   **Weekly Checklist Form**: A dedicated table to track class attendance, review, and preview for each course. Uses interactive emojis (✅ ❌ ⚠️).
*   **Deadline Timeline**: View all tasks chronologically by week. Add, edit, or delete tasks on the fly.
*   **Theme Switcher**: Toggle between a sleek Dark Mode and a crisp, Apple-inspired Light Mode.
*   **Local Storage Persistence**: All your tasks, courses, and checklist inputs are automatically saved to your browser so you never lose progress.

### 💻 How to Use

#### 1. Starting the Development Server
To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed, then run the following commands in the project directory:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173/` in your browser.

#### 2. Managing Courses
At the top of the interface, you will see a **Units / Courses** grid.
*   **Add**: Click the "Add Unit" button. Enter the Subject ID (e.g., FIT1000), Name, Type, and pick your favorite color. Click "Save".
*   **Delete**: Hover over a course card and click the "X" button to remove it. 

#### 3. Weekly Checklist
Use the weekly checklist table to keep track of your routine study loops.
*   The table automatically syncs with the courses you've added.
*   Click inside any cell under Class, Review, or Preview to type plain text notes.
*   Click the **✅, ❌, or ⚠️** buttons above each text box to quickly insert status icons.

#### 4. Tracking Deadlines
In the **12-Week Timeline**:
*   **Add Task**: Click the "+ Add Task to Week X" button at the bottom of any week's block. Select the associated course and fill in the details.
*   **Edit Task**: Click the pencil ✏️ icon (or the task details text) to enter Edit Mode. Here you can change the Task Name or the Deadline notes. Press Enter or click "Save" to finish.
*   **Delete Task**: Hover over a task card. A trash bin 🗑️ icon will appear on the right side. Click it to delete that task.

### 🛠 Tech Stack
*   **React** (Vite template)
*   **Vanilla CSS** (CSS Variables for dynamic theming)
*   **Lucide-React** (Icons)
*   **LocalStorage** (State persistence)

</details>

<br/>

<details>
<summary><b>🇨🇳 中文版本</b></summary>

一款极简主义、苹果风格的学生专属看板。支持追踪 Deadline (ddl)、管理每周常规任务，并进行每周复盘总结。

### 🚀 功能特性

*   **动态课程管理**: 添加并管理你当前学期的课程，支持自定义专属主题色。
*   **每周打卡表单**: 专属记录表，追踪每门课的上课情况、复盘和预习，支持快速插入状态表情 (✅ ❌ ⚠️)。
*   **DDL 时间轴**: 按时间轴清晰展示每周任务。支持随时新建、编辑标题、详情及删除操作。
*   **深浅色模式切换**: 支持一键切换极简原生的深色与浅色模式。
*   **本地存储**: 所有数据自动保存在浏览器本地，刷新不丢失。

### 💻 使用说明

#### 1. 启动项目
确保你的电脑上安装了 [Node.js](https://nodejs.org/)，然后在项目目录下执行以下命令：

```bash
# 安装依赖项 (仅首次需要)
npm install

# 启动开发服务器
npm run dev
```

然后在浏览器中打开 `http://localhost:5173/`。

#### 2. 管理科目
在界面顶部的科目卡片区域：
*   **添加**: 点击 "Add Unit" 按钮。输入科目代码 (例如：FIT1000)、名称、类型，并选择一个喜欢的主题色，然后保存。
*   **删除**: 鼠标悬停在科目卡片上，点击出现的 "X" 按钮即可删除。

#### 3. 每周复盘表单 (Weekly Checklist)
使用 "每周checklist" 表单来追踪你的日常学习循环。
*   表格会自动同步你已添加的课程。
*   点击 "上课"、"复盘" 或 "预习" 下的任意单元格即可输入文本笔记。
*   点击文本框上方的 **✅、❌ 或 ⚠️** 按钮，可以快速插入状态图标。

#### 4. 追踪 DDL 任务
在 **12-Week Timeline** 中：
*   **添加任务**: 点击任意一周底部的 "+ Add Task to Week X" 按钮，选择相关课程并填写具体内容。
*   **编辑任务**: 点击铅笔 ✏️ 图标（或任务详情文字）进入编辑模式，可修改任务名称和截止日期信息。按回车键或点击保存完成编辑。
*   **删除任务**: 鼠标悬停在任务卡片上，右侧会出现垃圾桶 🗑️ 图标，点击即可删除该任务。

### 🛠 技术栈
*   **React** (Vite 模板)
*   **原生 CSS** (CSS 变量实现动态主题)
*   **Lucide-React** (图标库)
*   **LocalStorage** (状态本地持久化)

</details>

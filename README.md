# TodoList & Reflection Dashboard (待办与复盘看板)

A minimalist, Apple-inspired dashboard for students to track deadlines, manage weekly routines, and write reflections.

一款极简主义、苹果风格的学生专属看板。支持追踪 Deadline (ddl)、管理每周常规任务，并进行每周复盘总结。

## 🚀 Features (功能特性)

*   **Dynamic Course Management (动态课程管理)**: Add and manage your enrolled units/courses, complete with custom color coding. (添加并管理你当前学期的课程，支持自定义专属主题色)。
*   **Weekly Checklist Form (每周打卡表单)**: A dedicated table to track class attendance, review (复盘), and preview (预习) for each course. Uses interactive emojis (✅ ❌ ⚠️). (专属记录表，追踪每门课的上课情况、复盘和预习，支持快速插入状态表情)。
*   **Deadline Timeline (DDL 时间轴)**: View all tasks chronologically by week. Add, edit, or delete tasks on the fly. (按时间轴清晰展示每周任务。支持随时新建、编辑标题/详情及删除操作)。
*   **Theme Switcher (深浅色模式切换)**: Toggle between a sleek Dark Mode and a crisp, Apple-inspired Light Mode. (支持一键切换极简原生的深色与浅色模式)。
*   **Local Storage Persistence (本地存储)**: All your tasks, courses, and checklist inputs are automatically saved to your browser so you never lose progress. (所有数据自动保存在浏览器本地，刷新不丢失)。

## 💻 How to Use (使用说明)

### 1. Starting the Development Server (启动项目)
To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed, then run the following commands in the project directory:
确保你的电脑上安装了 Node.js，然后在项目目录下执行以下命令：

```bash
# Install dependencies (安装依赖项 - 仅首次需要)
npm install

# Start the dev server (启动开发服务器)
npm run dev
```

Then open `http://localhost:5173/` in your browser. (然后在浏览器中打开 `http://localhost:5173/`)。

### 2. Managing Courses (管理科目)
At the top of the interface, you will see a **Units / Courses** grid.
*   **Add**: Click the "Add Unit" button. Enter the Subject ID (e.g., FIT1000), Name (e.g., FIT1000 导论), Type (e.g., 全个人), and pick your favorite color. Click "Save".
*   **Delete**: Hover over a course card and click the "X" button to remove it. 

### 3. Weekly Checklist (每周复盘表单)
Use the **每周checklist** table to keep track of your routine study loops.
*   The table automatically syncs with the courses you've added.
*   Click inside any cell under Class (上课), Review (复盘), or Preview (预习) to type plain text notes.
*   Click the **✅, ❌, or ⚠️** buttons above each text box to quickly insert status icons.

### 4. Tracking Deadlines (追踪 DDL 任务)
In the **12-Week Timeline**:
*   **Add Task**: Click the "+ Add Task to Week X" button at the bottom of any week's block. Select the associated course and fill in the details.
*   **Edit Task**: Click the pencil ✏️ icon (or the task details text) to enter Edit Mode. Here you can change the Task Name or the Deadline notes. Press Enter or click "Save" to finish.
*   **Delete Task**: Hover over a task card. A trash bin 🗑️ icon will appear on the right side. Click it to delete that task.

## 🛠 Tech Stack (技术栈)
*   **React** (Vite template)
*   **Vanilla CSS** (CSS Variables for dynamic theming)
*   **Lucide-React** (Icons)
*   **LocalStorage** (State persistence)

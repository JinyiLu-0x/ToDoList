export const courses = [
    { id: 'FIT1047', name: 'FIT1047 导论', type: '全个人', color: '#eab308' }, // yellow
    { id: 'FIT1049', name: 'FIT1049 职业', type: '小组特别多', color: '#3b82f6' }, // blue
    { id: 'FIT1050', name: 'FIT1050 Web', type: '有小组', color: '#10b981' }, // emerald
    { id: 'FIT2081', name: 'FIT2081 安卓开发', type: '全个人', color: '#a855f7' }  // purple
];

export const routines = [
    { id: '1049-ref', course: 'FIT1049', name: 'Weekly Reflection 每周反思 (Week 1-12, 周五 11:55 PM 截止)', deadline: '' },
    { id: '1049-quiz', course: 'FIT1049', name: 'Weekly Quizzes 每周测验 (仅 Week 1-5, 7-8 有, 周五 11:55 PM 截止)', deadline: '' },
    { id: '1050-act', course: 'FIT1050', name: 'In-Class Activities 课堂存档提交 (Week 2-4, 6-12, 周一早8点开放, 周五 11:55 PM 截止)', deadline: '' },
    { id: '1047-ref', course: 'FIT1047', name: '每周反思, 且每周五注意查收 Applied 给出的答案', deadline: '' }
];

export const timeline = [
    {
        week: 'Week 2',
        tasks: [
            { id: 't1', course: 'FIT1049', type: 'Task', name: 'Portfolio Task 1', deadline: '', details: '提交', isCritical: false, weight: '5%', tags: ['个人'] }
        ]
    },
    {
        week: 'Week 3',
        tasks: [
            { id: 't2', course: 'FIT1047', type: 'Assessment', name: 'Assessment 1 线上提交 (书面)', deadline: '3月20日(周五) 11:55 PM', details: '数字系统、字符编码及布尔电路分析与构建', isCritical: true, weight: '15%', tags: ['个人', '书面', '线上提交'] },
            { id: 't3', course: 'FIT1047', type: 'Practice', name: 'Assessment 1 Practice Test', deadline: '', details: 'Week 3 有 practice test', isCritical: false, weight: '', tags: ['个人'] },
            { id: 't4', course: 'FIT1049', type: 'Task', name: 'Portfolio Task 2', deadline: '', details: '小组作业', isCritical: false, weight: '5%', tags: ['小组'] }
        ]
    },
    {
        week: 'Week 4',
        tasks: [
            { id: 't5', course: 'FIT2081', type: 'Lab', name: 'Assessed Lab 1', deadline: '', details: '课堂限时完成，仅可用笔记/禁AI', isCritical: true, weight: '5%', tags: ['Lab', '个人', '线下'] },
            { id: 't6', course: 'FIT1047', type: 'Assessment', name: 'Assessment 1 线下测验', deadline: 'Week 4 Applied Session', details: '在您分配的 Applied Session 中进行', isCritical: true, weight: '', tags: ['个人', '线下'] },
            { id: 't7', course: 'FIT1050', type: 'Assignment', name: 'Assignment 1', deadline: '3月27日(周五) 11:55 PM', details: '个人作业：网站技术分析视频', isCritical: true, weight: '20%', tags: ['个人', '线上提交'] }
        ]
    },
    {
        week: 'Week 5',
        tasks: [
            { id: 't8', course: 'FIT2081', type: 'Assignment', name: 'Assignment 1', deadline: '4月3日(周五) 11:55 PM', details: 'Android App构建', isCritical: true, weight: '20%', tags: ['个人', '线上提交'] }
        ]
    },
    {
        week: '🏖️ 期中假期 (Mid-Semester Break)',
        tasks: [
            { id: 't9', course: 'Break', type: 'Rest', name: '好好休息', deadline: '', details: '顺便给期中后的狂轰滥炸做点准备', isCritical: false, weight: '', tags: [] }
        ]
    },
    {
        week: 'Week 6',
        tasks: [
            { id: 't10', course: 'FIT1049', type: 'Assignment', name: 'Assignment 1', deadline: '4月15日(周三) 10:00 AM', details: '个人实习意向展示', isCritical: true, weight: '15%', tags: ['个人', '线上提交'] },
            { id: 't10b', course: 'FIT1047', type: 'Assessment', name: 'Assessment 2 线上提交', deadline: '4月17日(周五) 11:55 PM', details: 'MARIE汇编语言编程, 相对较难', isCritical: true, weight: '30%', tags: ['个人', '线上提交'] },
            { id: 't11', course: 'FIT2081', type: 'Interview', name: 'Interview A1', deadline: '', details: 'Lab 课上进行 Assignment 1 的代码面试', isCritical: true, weight: '5%', tags: ['Lab', '个人', '线下'] }
        ]
    },
    {
        week: 'Week 7 (超级魔鬼周)',
        tasks: [
            { id: 't12', course: 'FIT2081', type: 'Lab', name: 'Assessed Lab 2', deadline: '', details: '课堂限时完成', isCritical: true, weight: '5%', tags: ['Lab', '个人', '线下'] },
            { id: 't13', course: 'FIT1050', type: 'Task', name: 'A2 Peer evaluation', deadline: '', details: '完成 Assignment 2 的同伴互评问卷', isCritical: false, weight: '5%', tags: ['个人', '线上提交'] },
            { id: 't14', course: 'FIT1050', type: 'Assignment', name: 'Assignment 2', deadline: '4月24日(周五) 11:55 PM', details: '小组作业：网站原型设计', isCritical: true, weight: '20%', tags: ['小组', '线上提交'] },
            { id: 't15', course: 'FIT2081', type: 'Assignment', name: 'Assignment 2', deadline: '4月24日(周五) 11:55 PM', details: 'App 代码分析评价/Critique', isCritical: true, weight: '20%', tags: ['个人', '线上提交'] }
        ]
    },
    {
        week: 'Week 8',
        tasks: [
            { id: 't16', course: 'FIT1047', type: 'Assessment', name: 'Assessment 2 线下演示与面试', deadline: 'Week 8 Applied Session', details: '课堂代码演示面试, 涉及OS进程和内存管理概念', isCritical: true, weight: '', tags: ['个人', '线下'] },
            { id: 't17', course: 'FIT1049', type: 'Task', name: 'Portfolio Task 3', deadline: '', details: '小组作业', isCritical: false, weight: '5%', tags: ['小组'] }
        ]
    },
    {
        week: 'Week 9',
        tasks: [
            { id: 't18', course: 'General', type: 'Info', name: '无大型 Assessment', deadline: '', details: '全力推进后续大作业的绝佳时期', isCritical: false, weight: '', tags: [] },
            { id: 't18b', course: 'FIT1047', type: 'Assessment', name: 'Assessment 3 线上提交', deadline: '5月8日(周五) 11:55 PM', details: '反思、真实网络案例分析、计算机网络基础', isCritical: true, weight: '30%', tags: ['个人', '线上提交'] }
        ]
    },
    {
        week: 'Week 10',
        tasks: [
            { id: 't19', course: 'FIT1049', type: 'Task', name: 'Portfolio Task 4', deadline: '', details: '小组展示', isCritical: false, weight: '5%', tags: ['小组', '线下'] },
            { id: 't20', course: 'FIT2081', type: 'Lab', name: 'Assessed Lab 3', deadline: '', details: '课堂限时完成，不能用AI', isCritical: true, weight: '5%', tags: ['Lab', '个人', '线下'] }
        ]
    },
    {
        week: 'Week 11 (终极魔鬼周)',
        tasks: [
            { id: 't21', course: 'FIT1049', type: 'Assignment', name: 'Assignment 2', deadline: '5月18日(周一) 11:55 PM', details: '团队视频制作', isCritical: true, weight: '25%', tags: ['小组', '线上提交'] },
            { id: 't22', course: 'FIT2081', type: 'Quiz', name: 'Final Quiz', deadline: 'Week 11 Lab课', details: '开卷 90 分钟', isCritical: true, weight: '20%', tags: ['Lab', '个人', '线下'] },
            { id: 't23', course: 'FIT1050', type: 'Assignment', name: 'Assignment 3', deadline: '5月22日(周五) 11:55 PM', details: '个人网站代码开发项目，基于A2', isCritical: true, weight: '30%', tags: ['个人', '线上提交'] },
            { id: 't24', course: 'FIT2081', type: 'Assignment', name: 'Assignment 3', deadline: '5月22日(周五) 11:55 PM', details: 'App扩展开发 - Coding Project', isCritical: true, weight: '20%', tags: ['个人', '线上提交'] },
            { id: 't25', course: 'FIT1049', type: 'Task', name: 'A2 Peer evaluation', deadline: '5月22日(周五)', details: '', isCritical: true, weight: '5%', tags: ['个人', '线上提交'] }
        ]
    },
    {
        week: 'Week 12',
        tasks: [
            { id: 't26', course: 'FIT1047', type: 'Assessment', name: 'Assessment 3 线下测验', deadline: 'Week 12 Applied Session', details: '涵盖局域网、广域网及互联网架构', isCritical: true, weight: '', tags: ['个人', '线下'] },
            { id: 't27', course: 'FIT2081', type: 'Interview', name: 'Interview A3', deadline: '', details: 'Lab课上进行 Assignment 3 的代码面试', isCritical: true, weight: '5%', tags: ['Lab', '个人', '线下'] }
        ]
    },
    {
        week: '📍 期末收尾及后续 (6月)',
        tasks: [
            { id: 't28', course: 'FIT1049', type: 'Assignment', name: 'Assignment 3', deadline: '6月8日(周一) 11:55 PM', details: '小组视频与书面汇报', isCritical: true, weight: '25%', tags: ['小组', '线上提交'] },
            { id: 't29', course: 'FIT1050', type: 'Assignment', name: 'Assignment 4', deadline: '6月12日(周五) 11:55 PM', details: '个人项目反思', isCritical: true, weight: '20%', tags: ['个人', '线上提交'] },
            { id: 't30', course: 'FIT1049', type: 'Task', name: 'A3 Peer evaluation', deadline: '6月12日(周五)', details: '', isCritical: true, weight: '5%', tags: ['个人', '线上提交'] },
            { id: 't31', course: 'FIT1047', type: 'Assessment', name: 'Assessment 4 (项目)', deadline: '6月8日(周一) 11:55 PM', details: '企业网络安全漏洞分析及安全控制设计', isCritical: true, weight: '25%', tags: ['个人', '线上提交'] }
        ]
    }
];

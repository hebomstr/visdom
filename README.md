# Visdom | Proof of Concept & User Guide

This is the proof of concept application of our project work. It's purpose is only to demonstrate the functionality of our visualizations and designs in a real web page. Quality and scalability of the code was not a requirement. All libraries that have been used are under MIT license.

# Heroku

The app is running on Heroku at least until July 2022. Link: https://visdom-poc.herokuapp.com/ 
Refreshing the page will reset all changes. Git examples can be found in Example Course page.
The best user experience is probably with 90% zoom (chrome):

![kuva11](https://user-images.githubusercontent.com/74241142/163133534-3c5642fc-d755-4377-8fb4-17c17eef622d.png)

# Installation
### Versions
npm: 8.5.5 | nodejs: v14.17.5

Download or clone the repository and run following commands in the root directory of the project. Application should start on localhost:3000.
```bash
C:\visdom-main> npm install
```
```bash
C:\visdom-main> npm start
```

# User Guide

## New chart

The chart shows the student’s estimated workload per week. Data for chart is calculated by: ((estimated working hours for a particular task divided by how many days the task is ongoing) times (how many days in a week the task is ongoing)).

https://user-images.githubusercontent.com/74241142/163780563-4467fbbf-4f30-4691-ae02-9fad7c845159.mp4


## Progress bars
The main page shows all the courses and their tasks. Courses can be found in courses.json. The length of the tasks in the progress bar are calculated by the estimated hours per task. This makes it easy for the user to see how large the tasks in the course are in relation to each other. The calculation can also be made with the points of the tasks. For example, Exercise 3 in Example Course requires a lot more work than Exercise 1 and 2. Hover tooltip feature allows the user to check name, status and deadline of tasks very quickly. 

https://user-images.githubusercontent.com/74241142/162960246-a6310323-5081-40b5-86ee-e56499a90d44.mp4

When user navigates to an individual course page, the progress bar is included in the side block. Progress bar also allows user to navigate to the tasks.

https://user-images.githubusercontent.com/74241142/162962849-cf1725e5-66fc-438f-9caf-e2c4eaa28959.mp4

## Coursepage layout
Course page can only have five different buttons. Course Information, Lectures, Exercises, Exams and Projects. A clear division of tasks facilitates the understanding of the course as a whole.

https://user-images.githubusercontent.com/74241142/162989956-3b0c1ef1-0b7f-42c3-a181-3bfa06f341d2.mp4

## Calendar
The calendar differs from normal calendars in that it shows the "ongoing tasks" and "upcoming tasks". Every exercise and project has start date and deadline in the JSON-file. 

![kuva2](https://user-images.githubusercontent.com/74241142/162967265-1c415ddd-df79-4b88-b3f8-03eb3de75fc5.png)

The start date is set by the teacher and it basically means the time frame within which the task should be started and done. Almost every course has a strict schedule but a common problem is that students still struggle to know what exercises they should be doing which causes delays in submissions. If a task is larger (project), it is marked as ongoing much earlier than smaller exercises.

### Ongoing tasks
Task is marked as ongoing if current date is between the recommended starting date and the deadline. If task is already done, it is not marked as ongoing. If deadline has passed but task is not submitted it is still ongoing. Our visualization shows the accumulation of tasks very well. Deadline and estimated work hours is also shown in ongoing task list.

https://user-images.githubusercontent.com/74241142/162970988-18bde1c9-79a3-4075-b4b8-70c62559433b.mp4


### Upcoming tasks
Task is marked as upcoming if the recommended starting date is within seven days or less. It is designed for students who like to do tasks in advance but it also helps students to prepare for future tasks. Upcoming task list shows recommended starting date, deadline and estimated work hours.

https://user-images.githubusercontent.com/74241142/162980910-2e8fca7b-d671-4485-93cc-de1afec3406d.mp4


### Tasks
There are four kind of tasks in our calendar: own notification (blue), exercise (yellow), exam (violet) and project (dark orange). Exercises and exams can also be marked as done (green with check icon) or failed (red with x icon). Tasks are found in tasks.json. Tasks can have deadline (for example 23:59) or time frame (for example 9:00:12-00). Tasks also have course abbreviation and exercise number.

![kuva3](https://user-images.githubusercontent.com/74241142/162975771-64fa4509-dc6e-47ee-8e55-86766bc40c7c.png)

![kuva4](https://user-images.githubusercontent.com/74241142/162975792-f64eb831-8fe0-4fd9-a0c0-d86622deabde.png)



### Icons
There are three icons in ongoing tasks. Orange bell, red alarm bell and X icon. Orange bell means that the exercise is ongoing. Red alarm bell appears whe the deadline is on the next day. X icon shows that task is failed which of course means that there is still some work to do.

![kuva5](https://user-images.githubusercontent.com/74241142/162978848-f1115244-2f6a-4a1f-af59-1bcb9e7dac92.png)

Same icons can also be found in the calendar.

https://user-images.githubusercontent.com/74241142/162979346-9b078041-f333-4555-8ae4-b8de0af9aa3d.mp4

Upcoming tasks have clock icon.

![kuva6](https://user-images.githubusercontent.com/74241142/162981265-70893fcd-dd54-4298-983b-d858b511276a.png)


### Own notifications
The user can add their own notifications to the calendar if they wish.

https://user-images.githubusercontent.com/74241142/162983627-ae1d15a1-f020-44fb-a2c9-207e3aa29070.mp4

### All courses filter
When the user is in individual course page and checks off all courses the calendar show only tasks for this particular course.

https://user-images.githubusercontent.com/74241142/162984733-73d616aa-c67b-4432-a358-a41cb625755b.mp4

### Projects filter
Projects can be checked off from the calendar. The reason for this will be explained soon.

https://user-images.githubusercontent.com/74241142/162985512-9724a0e6-9d84-4a22-b890-8c34c6638566.mp4

### Ongoing tasks filter
Ongoing tasks are marked as balls. According to user feedback, this can be little confusing but their meaning is easier to understand on an individual course page. 
The balls describe what type of task the user should do at a particular time or day. For example, project tasks may fill the whole calendar with balls so it is necessary to be able to check off projects from the calendar.

https://user-images.githubusercontent.com/74241142/162987029-e30c644d-1ed9-4a03-b4f5-e80882845635.mp4

### Own notifications filter
Users can check off their own notifications if needed.

https://user-images.githubusercontent.com/74241142/162987355-52b48ef9-eb89-48b2-94f7-38f63aad6562.mp4

### Heatmap
The heatmap visualizes student’s potential workload each day. Heatmap is calculated based on the tasks in a particular day.

https://user-images.githubusercontent.com/74241142/162988626-8aafa1e6-6f9f-4ccb-983e-46ee7703a17e.mp4

### Info icons
Due to user feedback, a few info hovers were added.

![kuva7](https://user-images.githubusercontent.com/74241142/163114133-d2c2041e-e627-4591-931d-e9576935a49b.png)
![kuva8](https://user-images.githubusercontent.com/74241142/163115388-0a843d5d-ab22-43a3-a57f-9aa094653a6a.png)
![kuva10](https://user-images.githubusercontent.com/74241142/163115775-b5a413be-2bb5-4312-8688-abcc7e66500d.png)


## Git submission
When student commits exercise to github, the automation chain begins to perform tasks. If everything goes well, UI displays success messages.

https://user-images.githubusercontent.com/74241142/163197347-77572f48-7b7a-4e40-916d-d508ecd9a3c9.mp4

If there's any errors, UI displays error messages and instructions for fixing the bugs. Exercise page contains information about the tests that are run for this particular exercise. Under every test title there are explained common errors that make tests fail. Student can also ask for help from an assistant. The error generates an automatic message that makes the assistant's job easier.

![kuva13](https://user-images.githubusercontent.com/74241142/163198204-0a521979-ec32-4b8e-aa64-70a3d82e5add.png)

https://user-images.githubusercontent.com/74241142/163199680-9be715fd-9908-4f4f-951f-fe8ec54c51d7.mp4

Previous submissions are also recorded.

![kuva14](https://user-images.githubusercontent.com/74241142/163199931-f979b471-ea34-43db-9f3e-cc3e4e7dfc60.png)

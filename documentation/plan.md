# Personal Finance App

## Step 1: Defining the project

1. What is the project?

- This project is a personal finance tracking app that will be accessible on the web for mobile and desktop users.
- The app will allow users to input, categorize, and summarize their expenses. 
- The front end will be built using SvelteKit.
  - Svelte/SvelteKit was chosen because it:
    - Is highly performant.
    - Uses less boilerplate, which we expect to increase development speed.
    - Has built-in solutions for routing, state management, etc.
- Firebase will be utilized for authentication and data storage.
  - The project MAU (Monthly Active Users) is expected to be < 100.
  - All projected resource use should fall within the Firebase free tier.
  - Serverless architecture will increase deployment speed and reduce overall costs when MAU count is low.

2. What is the MVP?

- The MVP is a:
  - Web app that renders in a web browser
  - Has authentication actions (login, logout, register, reset password, delete account)
  - Accepts user expense input
  - Allows user expense modification (update, delete)
  - Displays a tabulated and summarized view of the data.

3. What are the "nice to haves"?

- User defined categories
- User defined summaries and tables
- Allow import from CSV, XLS, etc.

4. When will the project be complete?

- The project will be complete when:
  - All MVP features and basic styling have been implemented.

## Step 2: Creating the workflow

Created a Kanban board to track status of project components.

You can view the project board [here](https://github.com/users/dominicgaliano/projects/1/views/1).

## Step 3: Breaking the project down into smaller components

## Credits

This project plan was created by following [this reddit post](https://www.reddit.com/r/learnprogramming/comments/mumrgn/how_to_plan_and_build_a_programming_project_a/).

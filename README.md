# MVP - Family Tree

This project would be an app to draw and save your family tree.

## Setup (COPY,PASTE!)

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `create database facebook`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=facebook
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create a table called 'students' in your database.

- Make sure you understand how the `students` table is constructed. In your MySQL console, you can run `use facebook;` and then `describe students;` to see the structure of the students table.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm start` to start client server in development mode with hot reloading in port 3000.

## Basic Requirements (COPY,PASTE!)

Create a webpage with the following functionality:

- [x] A list of students.
- [x] A form to add new students. There should be room to input the first and last names, separately.
  - After clicking a button in the form, the new student should be added to the database and displayed on the page.
- [x] Each student can be deleted with a delete button. After clicking on this button, student should be deleted from the database and the updated list of students shown on the page
- [ ] Style the app to make it look as polished as possible. Bootstrap is already loaded in the index.html file, so you can use it if you want to.
- [ ] (Optional/bonus) Clicking on a student should show the student's profile to the right of the students list. The info to display this profile should be obtained from a fetch request to `/students/:id`

To accomplish this, you will need to:

- [ ] Finish the routes in the API server (`/routes/students.js`).
- [ ] Finish the front end (`/client/src/`). Create as many components as you need.

## Resources

- PROJECT 1: MVP - https://docs.google.com/document/d/1ilYoDMpLV2yYZx6Cok610ttx6eA19aUKrZBU8HXgg54/edit

- D3.JS - https://d3js.org/
- FAMILY TREE DNA - https://www.familytreedna.com/
- MY HERITAGE - https://www.myheritage.es/
- ANCESTRY - https://www.ancestry.com/family-tree/
- FAMILY SEARCH - https://www.familysearch.org/search/family-trees

Some ideas about the frontend:
- https://www.ohsweetbabies.com/images/decoration-balloon-family-tree-1.jpg
- https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/66351384/original/03e1a561616128e2f26dcb0848bc9c6fd517cfb2/design-a-unique-family-tree.png
- https://ksr-ugc.imgix.net/assets/024/416/202/4b24a038dc83efeb68387a66655369a6_original.png?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1552586603&auto=format&frame=1&q=92&s=c83fa2da29dc5ddb0b3bed5ede6c5975
- https://familyhistorydaily.com/wp-content/uploads/2018/03/Free-Family-Tree-Offers-Record-Hints-Tons-of-Tools-and-a-Modern-Design-1140x570.png
- 






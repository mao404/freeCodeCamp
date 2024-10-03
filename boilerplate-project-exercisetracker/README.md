# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

## Exercise Tracker

Build a full stack JavaScript app that is functionally similar to this: https://exercise-tracker.freecodecamp.rocks. Working on this project will involve you writing your code using one of the following methods:

- Clone this GitHub repo and complete your project locally.
- Use our Gitpod starter project to complete your project.
- Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

Your responses should have the following structures.

Exercise:

```json
{
  "username": "fcc_test",
  "description": "test",
  "duration": 60,
  "date": "Mon Jan 01 1990",
  "_id": "5fb5853f734231456ccb3b05"
}
```

User:

```json
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05"
}
```

Log:

```json
{
  "username": "fcc_test",
  "count": 1,
  "_id": "5fb5853f734231456ccb3b05",
  "log": [
    {
      "description": "test",
      "duration": 60,
      "date": "Mon Jan 01 1990"
    }
  ]
}
```

**Hint**: For the `date` property, the `toDateString` method of the `Date` API can be used to achieve the expected output.

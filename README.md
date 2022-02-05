# PlantFarm
### Frontend for web application
In order to communicate with the API, it is necessary to use the HTTP protocol. For this purpose, it was decided to use the popular Axios library, which makes it much easier to send requests and receive HTTP responses.

##### User interface
Two categories of users can be distinguished in the project, the first is an unlogged user, i.e. a guest, and the second is a logged in user acting as an administrator. Access to functionality varies depending on the role acquired.

###### Guest interface
A guest, and more specifically a user who is not logged in, has limited options for security reasons. This user only has access to the home page and the login panel. All functionalities regarding modification or performance of any actions are blocked.

When the application is launched, the home page is launched, which consists of four sections, respectively, plants, history, management and water tank.

###### Admin interface

An important difference between the administrator and the visitor is the access to the tabs that allow you to manage the database. These tabs are located on the navigation bar along with the login or logout button. The logged in user can use the home page as well as the non-logged in user. 

In the navigation bar, the "plants" tab allows you to manage the plant database. The user also has the option of filtering by a specific type of plant.

# PlantFarm
## Frontend for web application
In order to communicate with the API, it is necessary to use the HTTP protocol. For this purpose, it was decided to use the popular Axios library, which makes it much easier to send requests and receive HTTP responses.

#### User interface
Two categories of users can be distinguished in the project, the first is an unlogged user, i.e. a guest, and the second is a logged in user acting as an administrator. Access to functionality varies depending on the role acquired.

##### Guest interface
A guest, and more specifically a user who is not logged in, has limited options for security reasons. This user only has access to the home page and the login panel. All functionalities regarding modification or performance of any actions are blocked.

When the application is launched, the home page is launched, which consists of four sections, respectively, plants, history, management and water tank.

###### "Login" tab


##### Admin interface

An important difference between the administrator and the visitor is the access to the tabs that allow you to manage the database. These tabs are located on the navigation bar along with the login or logout button. The logged in user can use the home page as well as the non-logged in user. 

###### "Plants" tab
In the navigation bar, the "plants" tab allows you to manage the plant database. The user also has the option of filtering by a specific type of plant.

<img src="/plants.png">

The administrator can add his own types of plants and set their growth parameters. You need to set the plant name, humidity and temperature value, growth time and set the plant type. It is also necessary to set up an overview graphic. Template validation has been implemented to protect against entering unwanted values or leaving them blank.

1 <img src="/plants.png">

Additionally, it is possible to modify the data of a plant that already exists in the database.

2 <img src="/plants.png">

Removal of a given plant from the database requires additional confirmation, as the data on crops and measurements are deleted together with the plant.

###### "Management" tab

The next tab is responsible for monitoring the condition of crops on all plantations. It allows you to start a new cultivation on a given plantation and end the current one. Each unseeded plantation is presented as a blank tile with a brown information bar. When a plant is grown in a given plantation, the information bar displays information about the selected plant, such as the name, type of plant and its photo. In the center of the tile, the most recently taken measurements, the current growth time of the plant and the time remaining until the plant has finished growing are displayed. The conditions on a given plantation are controlled, which allows for the detection and communication of any deviations from the established measurement parameters for a given plant, thanks to which the customer can react appropriately earlier. Depending on the deviation, a corresponding message is displayed together with the signaling color. Blue color means a situation in which the parameter value is too low, orange - that the norm has been slightly exceeded, and red means that the norm has been significantly exceeded.

3 <img src="/plants.png">

Starting a new crop is done by selecting a given plant from the list.

4 <img src="/plants.png">

An attempt to terminate a given crop is signaled with an additional confirmation message, which contains information about how long is left until the end of the cultivation or how many days the cultivation has been extended.

###### Water tank


###### "History" tab

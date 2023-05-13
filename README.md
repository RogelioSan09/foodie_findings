# Foodie Finder


## Table of Contents
- [Description](#Description)
- [Authors](#Authors)
- [Usage](#Usage)
- [Credits](#Credits)
- [License](#License)
- [Badges](#Badges)


### Authors
- Rogelio Sanchez Montes (https://github.com/RogelioSan09)
- Caleb Lapitan (https://github.com/clapitan1)
- Michelle (Tia) Baker Brown (https://github.com/michellebaker1129)

### Description
Are you hungry?
Do you want to eat something delicious?

But you don't know what to eat?

Don't worry, we've got you covered!

Our app can help you find the perfect meal for any occasion.
Just enter your favorite cuisine, and we'll show you a list of restaurants that match your search.
You can even favorite your favorite recipes and restaurants, so you can easily find them again later.

So what are you waiting for?

Download our app today and start eating delicious food!

### Usage
As a user, 
I WANT to search for restaurants by cuisine, 
SO THAT I can find the perfect meal for any occasion. 

WHEN I visit the website 
THEN I am presented with a login or sign up page

WHEN I log in
THEN I am required to fill in my username and password
THEN I am taken to the main search and results page

WHEN I sign up
THEN I am required to fill in my username, password
THEN I am taken to the main search and results page

WHEN I enter my password
THEN I know my information is safe (bcrypt)

WHEN I enter a search by cuisine,
THEN I am presented with relevant results in recipes AND restaurants on one page
[Front End Code](https://i.imgur.com/GbioL35.png)
The code displayed handles the front end aspects of the website. Displays the page title, search bars for user query and location, as well as a submission button.
The code also handles displaying the results of the user's search after the data has been retrieved from the Yelp API.
[Imgur](https://i.imgur.com/VqN55Ur.png) [Imgur](https://i.imgur.com/Y9m1uhz.png)
Back end development: A call is performed to Yelp Api and we are filtering the yelp database by user search term and location.
[Imgur](https://i.imgur.com/6S1rXyX.png)
Back end Development: An event listener is established for the submission of user's search, created a function to initialize the render function upon form submission.

WHEN I click on a results title or image
THEN I am directed to the source URL.

WHEN I click to like a search result
THEN I will see a heart filled in next to the liked result

[Website Demo](https://i.imgur.com/lCJfCkF.gifv)

### Credits
- UC Berkeley Coding Bootcamp, (https://bootcamp.berkeley.edu/coding/)
- Some excellent Tailwind CSS tutorials by Mo, (https://www.youtube.com/@mowebdev4162)
- Coolors for color palette help, (coolors.co)
- Corey Yates, Tutor Extraordinaire (https://www.linkedin.com/in/corey-yates-codes/)
- Josiah Rooney, Master Mentor (https://www.linkedin.com/in/josiahrooney/)

### License
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
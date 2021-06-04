# Cocktail app

Welcome! Cocktail app is a simple app where one can save cocktail recipes and create combinations between cocktails and a list of ingredients. However, behind the scenes, the app is secretly measuring your level of inebriation whilst interacting with the website*. Skip to the trackers section to find out more.

*The measures used are in no way validated, examine the data with a heavy grain of salt.

## Setup

Cocktail app requires Ruby (version 2.6), Ruby on Rails (version 6.0), and Docker (version 20.10) to run.

[Follow this link to set up Ruby and Ruby on Rails](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails).

To install Docker, simply go to the Docker [website](https://www.docker.com/), make an account and follow their instructions.

Once Docker is installed, run the following command to pull Snowplow Micro onto your local machine

```bash
docker pull snowplow/snowplow-micro
```

Snowplow Micro is what allows us to track the interactions that occur on a web page, [read more here](https://snowplowanalytics.com/blog/2019/07/17/introducing-snowplow-micro/)

Once these steps are complete, you have all the software needed to run the app. You should now fork the repo, and navigate inside the repo in your CLI. Once inside, run the following commands, which downloads all of the dependencies you will need and sets up the database:

```bash
bundle install
yarn install
rails db:create db:migrate db:seed
```

You are now ready to start your servers. Run the following commands, each in their own CLI window.

```bash
docker run --mount type=bind,source=$(pwd)/snowplow-config,destination=/config -p 9090:9090
snowplow/snowplow-micro:1.1.2 --collector-config /config/micro.conf --iglu /config/iglu.json

rails s
```

Once both servers are up and running, you should now be able to navigate to the following webpages

<http://localhost:9090/micro/all>

<http://localhost:3000/>

The first link allows us to see data being tracked, follow [this guide](https://github.com/snowplow-incubator/snowplow-micro/) for more information.

The second is the app itself.

## Trackers

The app makes use of three trackers, gleaning information on the user’s current sobriety level from a number of interactions on the page. The code for each of these trackers can be found in the app/javascript file path.

###  trackPageView();

This is a default tracker that comes with Snowplow browser tracker, providing data each time a user visits a new page. We are interested in:

* Context[Timestamp]: This can be used to find out the time of day a user visits, where we might assume a visit in the evening increases the likelihood of inebriation.
* page_url: Tells us which page the user visited, which will be used in conjunction with other trackers (see below).

### formTracker();

formTracker is a custom function which provides all of the usual data that Snowplow’s enableFormTracking uses. However, it also includes a function returning a structured event anytime a user deletes an entry from a form. We are interested in:

* derived_tstamp: This tells us when the form was submitted, which can be compared against the timestamp from the initial page view to determine how long it takes a user to navigate through the form.
* structured event: Each structured event returned shows us when the user deleted text in the form, letting us know how many mistakes they are likely to have made in the process.
* elements: We can see the name of the cocktail/combination users entered, and if they used an alcoholic ingredient.

### misclickTracker();

MisclickTracker is a custom function - every button on the page has a small catchment area around it. Anytime a user clicks a button (or just outside), an event is fired. We are interested in:

* misclick?: A boolean, returning true if they clicked outside of the button, and false if they clicked inside - a high number of misclicks might suggest the user is under the effects of alcohol.
* timestamp: A record of how long the user has been on the page, allowing us to use the difference between two timestamps to determine how long it took the user to recover from a misclick.


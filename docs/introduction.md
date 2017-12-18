# Introduction

SmartSDK is the FIWARE's "cookbook" for developing smart applications in the
Smart City, Smart Healthcare, and Smart Security domains.
Concretely this means that SmartSDK refines, combines and develops new
FIWARE services and FIWARE Data Models into a set of well-codified
and ready-to-use solutions. This is very important to facilitate the take up of
FIWARE by new developers and its transition from proof-of-concept environments
to production ones.

This documentation provide an introduction to the most relevant outcomes of
SmartSDK by means of an Application Scenario. The purpose of the application
scenario is not to provide a complex application, but guide the developers
through the features offered by SmartSDK in a simple way.

N.B. Not all features described in the scenario below may be yet available in
the guided tour, but they will be released in further steps.

## Application Scenario

Smog City is affected by heavy polluted air. Smokie, the major of Smog City,
asked to MJ, the head of the IT department, to deploy in no time a solution to:

* Collect air pollution data from sensors;
* Store historical data about air pollution;
* Create dashboards displaying air pollution evolution over time;
* Notify citizens of pollution alerts;
* Self-advertise to citizens the availability of the new service;

[Scenario Diagram]

FIWARE offers several functionalities that may help MJ, and SmartSDK
wraps and extend them in a easy way to deploy them, saving her a lot of time!

Briefly MJ finds out that she can:

* Use Cloudino or SmartSpot to measure air pollution;
* Use ContextBroker to collect air pollution data;
* Use QuantumLeap to store historical data and create dashboards;
* Use xxx to notify citizens about pollution alerts;
* Use SmartSpot to let know to all nearby Android users about the air quality
  dashboard.

What is also very nice, is that SmartSDK provides many recipes to deploy a basic
platform offering all the above features!

[Architecture Diagram]

### 
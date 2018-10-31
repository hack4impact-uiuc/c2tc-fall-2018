# C2TC Fall 2018 Backend Design

## Schema Design

**BUSINESS**

|   name  |   yelp_id  |   location  |   image_url  |   display_phone  |   open_hours  |
|:-:|:-:|:-:|:-:|:-:|:-:|

**BUSSTOP**

|   stop_id  |   stop_name  |   latitude  |   longitude  |   routes  |
|:-:|:-:|:-:|:-:|:-:|

**CRIME**

|   incident_id  |   incident_datetime  |   incident_type_primary  |   incident_description  |   address_1  |   city  |   state  |   latitude  |   longitude  |   hour_of_day  |   day_of_week  |   parent_incident_type    |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|

**EMERGENCY PHONE**

|   emergencyPhone_id  |   latitude  |   longitude  |
|:-:|:-:|:-:|

**STREETLIGHT**

|   streetlight_id  |   latitude  |   longitude  |
|:-:|:-:|:-:|
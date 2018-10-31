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

## Endpoints Documentation

### Endpoint

    GET /open_businesses

**Description**

**Response**

### Endpoint

    GET /businesses

**Description**

**Response**

### Endpoint

    POST /businesses

**Description**

**Response**

### Endpoint

    POST /scrape_businesses

**Description**

**Response**

### Endpoint

    GET /busStops

**Description**

**Response**

### Endpoint

    POST /busStops

**Description**

**Response**

### Endpoint

    POST /scrape_stops

**Description**

**Response**

### Endpoint

    GET /crimes

**Description**

**Response**

### Endpoint

    POST /crimes

**Description**

**Response**

### Endpoint

    POST /scrape_crimes

**Description**

**Response**

### Endpoint

    GET /emergencyPhones

**Description**

**Response**

### Endpoint

    POST /emergencyPhones

**Description**

**Response**

### Endpoint

    POST /scrape_phones

**Description**

**Response**

### Endpoint

    GET /streetlights

**Description**

**Response**

### Endpoint

    POST /streetlights

**Description**

**Response**
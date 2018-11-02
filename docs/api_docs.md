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

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| time  | int | **Required** | #### (time as 4 digit 24hr time, eg. 1430 = 2:30pm)
| day  | int | **Required** | # (integer 0-6, where 0 is Monday)

**Response**

    {
        "message": "Success",
        "result": {
            "businesses": [
                {
                    "_id": "5bd63a71ed396d1d5b198f8b",
                    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/5tn-zU6PGPvbZoXnPi4Ahw/o.jpg",
                    "location": {
                        "address1": "1209 W Oregon St",
                        "city": "Urbana",
                        "country": "US",
                        "state": "IL",
                        "zip_code": "61801"
                    },
                    "name": "The Red Herring Vegetarian Restaurant",
                    "open_hours": [
                        {
                            "day": 0,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        }
                    ],
                    "yelp_id": "kKCwp86xU9XKRnAALQDhrw"
                }
            ]
        },
        "success": true
    }

### Endpoint

    GET /businesses

**Description**

**Response**

    {
        "message": "Success",
        "result": {
            "businesses": [
                {
                    "_id": "5bd63a71ed396d1d5b198f8b",
                    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/5tn-zU6PGPvbZoXnPi4Ahw/o.jpg",
                    "location": {
                        "address1": "1209 W Oregon St",
                        "city": "Urbana",
                        "country": "US",
                        "state": "IL",
                        "zip_code": "61801"
                    },
                    "name": "The Red Herring Vegetarian Restaurant",
                    "open_hours": [
                        {
                            "day": 0,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        }
                    ],
                    "yelp_id": "kKCwp86xU9XKRnAALQDhrw"
                }
            ]
        },
        "success": true
    }

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

    {
        "message": "Success",
        "result": {
            "busStops": [
                {
                    "_id": "5bd64156ed396d1ee50955c3",
                    "latitude": 40.114512,
                    "longitude": -88.180673,
                    "routes": {
                        "6": "000000"
                    },
                    "stop_id": "150DALE:1",
                    "stop_name": "U.S. 150 & Dale (NE Corner)"
                }
            ]
        },
        "success": true
    }

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

    {
        "message": "",
        "result": {
            "crimes": [
                {
                    "_id": "5bc916d53d336f0592ef45fa",
                    "address_1": "Outside Shreyas's apartment",
                    "city": "Champaign",
                    "day_of_week": "Monday",
                    "hour_of_day": 23,
                    "incident_datetime": "10/18/2018, 18:27:09",
                    "incident_description": "Self explanatory",
                    "incident_id": "1",
                    "incident_type_primary": "Peeing in public",
                    "latitude": 100.1,
                    "longitude": 200.2,
                    "parent_incident_type": "Disturbing the peace",
                    "state": "IL"
                }
            ]
        },
        "success": true
    }

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

    {
        "message": "",
        "result": {
            "emergencyPhones": [
                {
                    "_id": "5bd634afed396d1a9001053c",
                    "emergencyPhone_id": 0,
                    "latitude": 40.0957696644812,
                    "longitude": -88.2405983758263
                }
            ]
        },
        "success": true
    }

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

    {
        "message": "",
        "result": {
            "streetlights": [
                {
                    "_id": "5bd280ab3d336f02d2b06a18",
                    "latitude": 200.2,
                    "longitude": 300.3,
                    "streetlight_id": 0
                }
            ]
        },
        "success": true
    }

### Endpoint

    POST /streetlights

**Description**

**Response**
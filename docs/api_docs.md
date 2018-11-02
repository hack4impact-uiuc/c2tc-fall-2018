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

    {
        "message": "",
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
                        },
                        {
                            "day": 1,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        },
                        {
                            "day": 2,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        },
                        {
                            "day": 2,
                            "end": "2000",
                            "is_overnight": false,
                            "start": "1700"
                        },
                        {
                            "day": 3,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        },
                        {
                            "day": 4,
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
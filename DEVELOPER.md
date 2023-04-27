# Mosfitech API Documentation

## Mopartner

This rest api is for mosfitech partners so they can control and monitor kits in realtime

### request

- <span style="color:white; background-color:green; padding:1px 8px ;  border-radius: 8px">get</span> | `https://api.berusaha.live/mopartner/` get all data partner
- <span style="color:white; background-color:blue; padding: 1px 8px;border-radius: 8px;">post</span> | `https://api.berusaha.live/mopartner/` add new data mitra
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/mopartner/:id` updated data mitra { require all body }
- <span style="color:white; background-color:red; padding: 1px 8px;border-radius: 8px;">delete</span>| `https://api.berusaha.live/mopartner/:id` delete one mitra
- <span style="color:white; background-color:green; padding:1px 8px ;  border-radius: 8px">get</span> | `https://api.berusaha.live/mopartner/:id` detail spesifik mitra using find by \_id
- <span style="color:white; background-color:green; padding:1px 8px ;  border-radius: 8px">get</span> | `https://api.berusaha.live/mopartner/emmail` detail spesifik mitra using find by email

### response

- <span style="color:white; background-color:orange; padding:1px 8px ;  border-radius: 8px">200</span> <b>Success</b>
- <span style="color:white; background-color:blue; padding:1px 8px ;  border-radius: 8px">400</span> <b>Bad Request</b>
- <span style="color:white; background-color:red; padding:1px 8px ;  border-radius: 8px">500</span> <b>Internal Server Error</b>

<hr>

## Kits

Rest api to connect users to hardware kits

### request

- <span style="color:white; background-color:green; padding:1px 8px ;  border-radius: 8px">get</span> | `https://api.berusaha.live/kits/` get all data kits
- <span style="color:white; background-color:blue; padding: 1px 8px;border-radius: 8px;">post</span> | `https://api.berusaha.live/kits/` add new data kits
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/:id` updated data kits { require all body }
- <span style="color:white; background-color:red; padding: 1px 8px;border-radius: 8px;">delete</span>| `https://api.berusaha.live/kits/:id` delete one kits
- <span style="color:white; background-color:green; padding:1px 8px ;  border-radius: 8px">get</span> | `https://api.berusaha.live/kits/emmail` detail spesifik kits using find by email
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/warning/:id` updated data kits only warning status
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/location/:id` updated data kits only location kits
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/battray/:id` updated data kits only battray percentage kits
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/rental/:id` updated data to ready rental {rental_status,rental_time,latest_rent_username,latest_rent_email}
- <span style="color:white; background-color:green; padding:1px 8px ;  border-radius: 8px">get</span> | `https://api.berusaha.live/kits/rental/:id` detail spesifik kits using find by id

### websocket to mqtt

- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/publish/:id` updated rental status
- <span style="color:black; background-color:yellow; padding: 1px 8px;border-radius: 8px;">put</span> | `https://api.berusaha.live/kits/publish/warning/:id` updated data to warning zone kits

### response

- <span style="color:white; background-color:orange; padding:1px 8px ;  border-radius: 8px">200</span> <b>Success</b>
- <span style="color:white; background-color:blue; padding:1px 8px ;  border-radius: 8px">400</span> <b>Bad Request</b>
- <span style="color:white; background-color:red; padding:1px 8px ;  border-radius: 8px">500</span> <b>Internal Server Error</b>

<hr>

## MQTT Broker

Connectivity broker with the mqtt protocol uses the pub sub method to exchange data information between servers and kits in real time, where there is a geofencing process using georedis computations that can calculate the area of the vehicle

### topic

<hr>
<b>kits subscribe</b>
<br>

- `rental/uuid`
  - response {rental status, 0 to no rental and 1 ready to rental}
- `rental/warning/uuid`
  - response {rental warning zone 0 to false & 1 to true}
  <hr>

<b>kits publish</b>
<br>

- `rental/battray`
  - response updated data battray to db
    - format data `uuid,data-battray`
- `rental/location`
  - response updated data location
    - format data `uuid,latitude,longitude`

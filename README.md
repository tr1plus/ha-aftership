# UPDATE: DEPRECATED
There are now more standard and better approaches to doing this. I like to think this little thing was a push in the right direction :)

https://www.home-assistant.io/integrations/aftership/

https://github.com/iantrich/aftership-card



# Aftership for Home Assistant
Aftership state card for use in HomeAssistant
![ha-aftership](https://github.com/tr1plus/ha-aftership/blob/master/images-README/aftership-hass.png "ha-aftership in action!")

## Story
Recently I felt the need for a [HomeAssistant](https://www.home-assistant.io/) component which would allow me to track all my parcels I am expecting. As with all DIY people out there this list can get lengthy. I found some [others attempting to do something similar](https://community.home-assistant.io/t/aftership-package-tracking/24068), but this would only cause more and more problems for my specific case (logs getting flooded on missing packages, losing the overview on the HomeAssistant homepage, …)

I am using [AfterShip](https://www.aftership.com/) as this is a platform that allows me to add (for free!) all my packages and automatically look for missing information. And they have a very easy to use API!

## Usage
Simply copy the www folder to your www folder so that the state-card-aftership.html file is located in your home assistant directory in the following path:
```
\www\custom_ui\state-card-aftership.html
```

Finally add the entry from the configuration.yaml file under your sensors component in your own configuration.yaml file.
```
customize:
  ##aftership
  sensor.aftership_sensor:
    custom_ui_state_card: state-card-aftership

frontend:
  extra_html_url:
    - /local/custom_ui/state-card-aftership.html

sensor:
  #Package tracking aftership
  - platform: rest
    name: AfterShip Sensor
    resource: https://api.aftership.com/v4/trackings/
    value_template: '{{ value_json["data"]["count"]}}'
    json_attributes:
      - data
    headers:
      aftership-api-key: !secret aftership
      Content-Type: application/json
```
You will need an api key. Go to your [aftership api settings](https://secure.aftership.com/#/settings/api). I am using the default one.

## LoveLace
Just as I was creating this lovelace got released. As promised I made a very basic initial version. I will improve on this as I see I have more possibilities now as the card can be created in javascript only.
Usage is similar, but the additional configuration should be done in ui-lovelace.yaml:
```
resources:
  - url: /local/custom_ui/state-card-aftership.js
    type: js
views:
- name: Example
  cards:
  - type: "custom:state-card-aftership-ll"
    entity: sensor.aftership_sensor
```


# Santa Tracker

## Introduction
This document provides an overview of the Santa Tracker project. The Santa Tracker is a fun and interactive way to follow Santa's journey around the world on Christmas Eve.

## Features
- Real-time tracking of Santa's location
- Interactive map with Santa's route
- Countdown timer to next destination
- Present count
- Population counter
- Photos of present/upcoming destinations

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Leaflet.js (for interactive maps)

## Implementation Details

### Real-time Tracking
The Santa Tracker utilizes data from the open-source Google Santa Tracker to provide real-time tracking. While the data does not pinpoint Santa's exact location, it includes 450 predetermined locations where Santa will deliver presents, along with their respective departure and arrival times.

By leveraging these times, we can ascertain whether Santa is at a specific location or en route. If he is at a location, his position is precisely known as per the data. If he is traveling, his position is estimated by interpolating coordinates based on the arrival and departure times and the coordinates of the two locations.

### Interactive Map
Leaflet.js is employed to render an interactive map that showcases Santa's route. This map refreshes every 10 seconds to reflect real-time updates using the predicted data. The map tiles are sourced from OpenStreetMap, ensuring a detailed and accurate representation.

### Countdown Timer
The countdown timer is implemented using JavaScript's `setInterval` function. This function updates the timer every second, counting down to zero before resetting for the next location. This ensures users are always aware of Santa's next destination.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, please contact me at [kamran@rainbowlogic.co.uk](mailto:kamran@rainbowlogic.co.uk).

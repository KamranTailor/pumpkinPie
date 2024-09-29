import kamran from "../functions/main.js";

const initializeFlightSocket = (io) => {
  // Create a new namespace for flights
  const flightNamespace = io.of('/flights');
  
  flightNamespace.on('connection', (socket) => {
      console.log('Client connected to the flight socket.');

      // Listen for a request for flight data
      socket.on('requestFlightData', () => {
          console.log('Client requested flight data.');

          // Simulate fetching and sending flight data every second
          const intervalId = setInterval(async () => {
              try {
                  const flightData = await getFlightData(); // Async function to fetch data
                  
                  // Send updated flight data back to the client
                  socket.emit('flightData', flightData); // Ensure to specify the event name
              } catch (error) {
                  console.error('Error fetching flight data:', error);
              }
          }, 1000); // Send data every 1000ms (1 second)

          // Handle disconnection
          socket.on('disconnect', () => {
              console.log('Client disconnected from flight socket.');
              clearInterval(intervalId); // Clear the interval to stop sending data
          });
      });
  });
};

async function getFlightData() {
  // Fetch the flight data asynchronously
  return await kamran.database.getDatabase("2f248411-4a71-4a1a-829b-d64d5dfa4e3b");
}

export default initializeFlightSocket;

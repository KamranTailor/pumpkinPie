const icons = {
    A0: L.icon({
        iconUrl: '/src/planes/A0.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    A1: L.icon({
        iconUrl: '/src/planes/A1.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    A2: L.icon({
        iconUrl: '/src/planes/A2.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    A3: L.icon({
        iconUrl: '/src/planes/A3.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    A4: L.icon({
        iconUrl: '/src/planes/A4.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    A5: L.icon({
        iconUrl: '/src/planes/A5.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    B0: L.icon({
        iconUrl: '/src/planes/B0.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    }),
    M1: L.icon({
        iconUrl: '/src/planes/M1.png', // Replace with actual icon file name
        iconSize: [38, 38],
        iconAnchor: [19, 38],
    })
    // Add more categories as needed
};

// Function to determine the icon based on category
function getIcon(category) {
    if (!category) return icons['A0']; // Default if category is not provided

    const firstLetter = category.charAt(0).toUpperCase(); // Get the first letter and convert it to uppercase

    if (firstLetter == "A") {
        return icons[category];
    } else if (firstLetter == "B") {
        return icons['B0']; 
    } else if (firstLetter == "M") {
        return icons['M1']; 
    } else {
        return icons['A3']; 
    }
}

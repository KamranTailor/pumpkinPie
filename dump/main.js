// dump/main.js

import { setTflData } from './getTubeStatus.js'; 
import { setPlaneData } from './getPlaneData.js'; 

// Initialize and start periodic tasks
export function initializePeriodicTasks() {
    setTflData();
    setPlaneData();
}

// dump/main.js

import { setTflData } from './getTubeStatus.js'; 
import { setPlaneData } from './getPlaneData.js'; 
import { getTfLLiftDisruptions } from './getTfLLiftDisruptions.js';
import { cashLttukData } from "./lttuk_initalGet.js";
import { fetchForniteShop } from "./getFortniteItemShop.js";

// Initialize and start periodic tasks
export function initializePeriodicTasks() {
    setTflData();
    setPlaneData();
    getTfLLiftDisruptions();
    cashLttukData();
    fetchForniteShop();
}

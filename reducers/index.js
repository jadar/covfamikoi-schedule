"use strict";

import { configureStore } from '@reduxjs/toolkit'
import eventList from "./eventList"

export default configureStore({
	reducer: {
		eventList
	}
});

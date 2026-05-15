import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInterface } from "@/types/event.interface";

type EventState = {
  events: EventInterface[];
};

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    // Remplace complètement la liste
    setEventsReducer: (state, action: PayloadAction<EventInterface[]>) => {
      state.events = action.payload;
    },

    // Ajoute un event
    addEventReducer: (state, action: PayloadAction<EventInterface>) => {
      state.events.push(action.payload);
    },

    // Reset
    clearEventsReducer: (state) => {
      state.events = [];
    },
  },
});

export const { setEventsReducer, addEventReducer, clearEventsReducer } =
  eventSlice.actions;

export default eventSlice.reducer;

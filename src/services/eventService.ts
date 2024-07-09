import { Event } from "../models/event";
import { EventFilters } from '../models/filters';

const events: Event[] = [];

export const addEvent = (event: Event): Event => {
  events.push(event);
  return event;
};

export const updateEvent = (id: string, updatedEvent: Partial<Event>): Event | null => {
  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent, updatedAt: new Date() };
    return events[index];
  }
  return null;
};

export const deleteEvent = (id: string): boolean => {
  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    return true;
  }
  return false;
};

export const getEventById = (id: string): Event | null => {
  return events.find(event => event.id === id) || null;
};

export const listEvents = (filters?: EventFilters): Event[] => {
    return events.filter(event => {
      if (!filters) return true;
      const keys = Object.keys(filters) as (keyof EventFilters)[];
      return keys.every(key => {
        if (key === 'location') {
          const locationFilters = filters[key] as Partial<Event['location']>;
          return Object.keys(locationFilters || {}).every(locKey => {
            const locKeyTyped = locKey as keyof Event['location'];
            return event.location[locKeyTyped] === locationFilters[locKeyTyped];
          });
        }
        return event[key] === filters[key];
      });
    });
  };
  

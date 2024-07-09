import { Event } from './event';

export interface EventFilters extends Partial<Omit<Event, 'location'>> {
  location?: Partial<Event['location']>;
}
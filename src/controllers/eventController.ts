import { Request, Response } from "express";
import * as eventService from "../services/eventService";
import { Event } from '../models/event';
import { EventFilters } from '../models/filters';

export const createEvent = (req: Request, res: Response) => {
  const event = eventService.addEvent(req.body);
  res.status(201).json(event);
};

export const editEvent = (req: Request, res: Response) => {
  const updatedEvent = eventService.updateEvent(req.params.id, req.body);
  if (updatedEvent) {
    res.status(200).json(updatedEvent);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const removeEvent = (req: Request, res: Response) => {
  const success = eventService.deleteEvent(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const getEvent = (req: Request, res: Response) => {
  const event = eventService.getEventById(req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const getAllEvents = (req: Request, res: Response) => {
    const filters: EventFilters = {};
  
    if (req.query.eventName) filters.eventName = req.query.eventName as string;
    if (req.query.organizer) filters.organizer = req.query.organizer as string;
    if (req.query.email) filters.email = req.query.email as string;
    if (req.query.phone) filters.phone = req.query.phone as string;
  
    const locationFilters: Partial<Event['location']> = {};
    if (req.query.street) locationFilters.street = req.query.street as string;
    if (req.query.city) locationFilters.city = req.query.city as string;
    if (req.query.state) locationFilters.state = req.query.state as string;
    if (req.query.zip) locationFilters.zip = req.query.zip as string;
    if (Object.keys(locationFilters).length > 0) filters.location = locationFilters;
  
    const events = eventService.listEvents(filters);
    res.status(200).json(events);
  };
  

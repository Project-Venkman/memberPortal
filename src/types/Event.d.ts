import * as React from "react";
import EventsContainer from "@components/Event/EventsContainer";
import EventCard from "@components/Event/EventCard";

export type EventsProps<
	P = {

	},
	> = P;
export type EventsContainerProps<
	P = {
		events: Array<Event>
	},
	> = P;
export type EventCardProps<
	P = {
		event: Event
	},
	> = P;
export interface Event {
	type?: string;
	name?: string;
	url?: string;
	description?: string;
}


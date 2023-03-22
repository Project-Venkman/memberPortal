import React from "react";
import {
	Event,
	EventDataContainer,
	EventDateDay,
	EventDateFull,
	EventDateMonth,
	EventDateShort,
	EventDescription,
	EventInfoContainer,
	EventMetaHeader,
	EventName,
	EventsContainer,
	EventsContainerHeader,
	EventsHeader
} from "@styles/index";
import { Asset, EventsProps } from "@customtypes/index";
import { useSelector } from "react-redux";
import { RootState } from "@state/index";

export const Events: React.FC<EventsProps> = (props) => {
	const { } = props;
	const events: Array<Asset> = useSelector((state: RootState) => state.eventAssets as Array<Asset>)

	return (
		<EventsContainer>
			{ events.map((event: Asset, i: number) => {
				return (
					<Event key={i} id={"event"}>
						<EventsContainerHeader id={"events-header"}>
							<EventsHeader>Events</EventsHeader>
						</EventsContainerHeader>
						<EventInfoContainer id={"event-container"}>
							<EventDateShort id={"event-date-short"}>
								<EventDateDay><span>{new Date().getDate()}</span></EventDateDay>
								<EventDateMonth>{new Date().toLocaleString('en-US', {month: 'short'}).toUpperCase()}</EventDateMonth>
							</EventDateShort>
							<EventDataContainer id={"event-info-container"}>
								<EventMetaHeader id={"event-header-info"}>
									<EventName id={"event-name"}>{event.name}</EventName>
									<EventDateFull id={"event-date-full"}>{new Date().toDateString()}</EventDateFull>
								</EventMetaHeader>
								<EventDescription id={"event-description"}>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								</EventDescription>
							</EventDataContainer>
						</EventInfoContainer>
					</Event>
				)}
			)}
		</EventsContainer>
	)
}
export default Events;
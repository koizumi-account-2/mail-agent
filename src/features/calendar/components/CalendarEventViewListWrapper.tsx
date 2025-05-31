"use client";
import { Fragment, useState } from "react";
import { CalendarEvent } from "../types";
import { CalendarEventView } from "./CalendarEventView";
import { Button } from "@/components/ui/button";
import {
  deleteTentativeEvents,
  submitTentativeEvents,
} from "@/lib/actions/calendarApi";
import { confirm } from "@/utils/confirm";
import { useRouter } from "next/navigation";
import { CustomeCard } from "@/components/common/CustomeCard";
import { CustomArea } from "@/components/area/CustomArea";
import Link from "next/link";

type EVENTS_STATUS = "NO_EVENTS" | "TENTATIVE" | "CONFIRMED" | "UNKNOWN";

export const CalendarEventViewListWrapper = ({
  events,
  projectId,
  threadId,
  isReadOnly = false,
}: {
  events: CalendarEvent[];
  projectId: number | null;
  threadId: string | null;
  isReadOnly?: boolean;
}) => {
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const router = useRouter();
  const addEventId = (eventId: string) => {
    setSelectedEventIds([...selectedEventIds, eventId]);
  };
  const removeEventId = (eventId: string) => {
    setSelectedEventIds(selectedEventIds.filter((id) => id !== eventId));
  };

  const handleSelectEvents = async () => {
    console.log(selectedEventIds);
    if (threadId !== null && projectId !== null) {
      const isConfirmed = await confirm(
        "本当に確定しますか？(他の候補日は削除されます)"
      );
      if (isConfirmed) {
        await submitTentativeEvents({
          eventId: selectedEventIds[0],
          projectId: projectId,
          threadId: threadId,
        });
        setSelectedEventIds([]);
        router.refresh();
      }
    }
  };
  const handleDeleteEvents = async () => {
    if (threadId !== null && projectId !== null) {
      const isConfirmed = await confirm("本当に削除しますか？");
      if (isConfirmed) {
        await deleteTentativeEvents({
          eventIds: selectedEventIds,
          projectId: projectId,
          threadId: threadId,
        });
        setSelectedEventIds([]);
        router.refresh();
      }
    }
  };

  const handleAllSelectEvents = async (checked: boolean) => {
    if (checked) {
      setSelectedEventIds(events.map((event) => event.id));
    } else {
      setSelectedEventIds([]);
    }
  };
  const isDisabledSubmitButton =
    selectedEventIds.length !== 1 ||
    events.find((event) => event.id === selectedEventIds[0])?.status ===
      "confirmed";

  const categorizeEvents = (
    events: CalendarEvent[]
  ): { [key: string]: CalendarEvent[] } => {
    const result: { [key: string]: CalendarEvent[] } = {}; //タイトルごとにグルーピング

    if (events.length === 0) {
      result["候補日がありません"] = [];
      return result;
    } else {
      events.forEach((event) => {
        if (event.summary in result) {
          result[event.summary].push(event);
        } else {
          result[event.summary] = [event];
        }
      });
      console.log(result);
      return result;
    }
  };

  return (
    <CustomeCard title="候補日" description="">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {isReadOnly ? (
            <></>
          ) : (
            <>
              <Button
                onClick={handleSelectEvents}
                disabled={isDisabledSubmitButton}
              >
                選択中のイベントを確定
              </Button>
              <Button
                onClick={handleDeleteEvents}
                disabled={selectedEventIds.length === 0}
              >
                選択中のイベントを削除
              </Button>
              <Button onClick={() => handleAllSelectEvents(true)}>
                全て選択
              </Button>
              <Button onClick={() => handleAllSelectEvents(false)}>
                全て選択解除
              </Button>
            </>
          )}
        </div>

        {Object.entries(categorizeEvents(events)).map(([key, targetEvents]) => (
          <EventGroup
            key={key}
            events={targetEvents}
            isReadOnly={isReadOnly}
            selectedEventIds={selectedEventIds}
            addEventId={addEventId}
            removeEventId={removeEventId}
            projectId={projectId}
            threadId={threadId}
          />
        ))}
      </div>
    </CustomeCard>
  );
};

const EventGroup = ({
  events,
  isReadOnly,
  selectedEventIds,
  addEventId,
  removeEventId,
  projectId,
  threadId,
}: {
  events: CalendarEvent[];
  isReadOnly: boolean;
  selectedEventIds: string[];
  addEventId: (eventId: string) => void;
  removeEventId: (eventId: string) => void;
  projectId: number | null;
  threadId: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("projectId", projectId, "threadId", threadId);
  const filteredEvents = isOpen ? events : events.slice(0, 1);
  let eventsStatus: EVENTS_STATUS = "NO_EVENTS";
  let eventsStatusText = "";
  if (events.length === 0) {
    eventsStatus = "NO_EVENTS";
    eventsStatusText = "候補日がありません";
  } else if (events.every((event) => event.status === "tentative")) {
    eventsStatus = "TENTATIVE";
    eventsStatusText = "候補日があります。確定してください";
  } else if (events.length === 1 && events[0].status === "confirmed") {
    eventsStatus = "CONFIRMED";
    eventsStatusText = "確定しています";
  } else {
    eventsStatus = "UNKNOWN";
    eventsStatusText = "候補日を設定、確定してください";
  }

  return (
    <CustomArea>
      <div className="flex justify-start p-1">
        <div>{eventsStatusText}</div>
        {isReadOnly &&
          events.length > 0 &&
          events[0].event_tag !== null &&
          events[0].event_tag.includes(":") && (
            <Link
              href={`/project/${events[0].event_tag.split(":")[0]}/${
                events[0].event_tag.split(":")[1]
              }/situation`}
            >
              <Button variant="outline">編集へ</Button>
            </Link>
          )}
        {eventsStatus === "NO_EVENTS" &&
          projectId !== null &&
          threadId !== null && (
            <Link
              href={`/calendar/candidate?projectId=${projectId}&threadId=${threadId}`}
            >
              候補日を設定
            </Link>
          )}
      </div>

      {events.length > 1 && (
        <div className="flex justify-start p-1">
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "閉じる" : "開く"}
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <Fragment key={event.id}>
            {!isReadOnly ? (
              <CalendarEventView
                event={event}
                isSelected={selectedEventIds.includes(event.id)}
                onSelect={addEventId}
                onDeselect={removeEventId}
                isReadOnly={isReadOnly}
              />
            ) : (
              <CalendarEventView event={event} isReadOnly={isReadOnly} />
            )}
          </Fragment>
        ))}
        {!isOpen && events.length > 1 && (
          <div className="flex items-end p-1">...</div>
        )}
      </div>
    </CustomArea>
  );
};

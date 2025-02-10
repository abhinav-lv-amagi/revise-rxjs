## GetShow example snippet (rxjs)

```typescript
export function getShow(
  feedCode: string,
  showId: string,
  options?: IGetShowOptions
) {
  const obs = new Observable<{
    show: IBlipShow;
    eventDetails: IEventDetails;
  }>((subscriber) => {
    if (!showId) {
      subscriber.next({ show: null, eventDetails: null });
      subscriber.complete();
    }

    const epubEventsSource = axios.CancelToken.source();
    const showSource = axios.CancelToken.source();

    let request = blipV3.get(
      `/feeds/${feedCode}/shows/${encodeURIComponent(showId)}`,
      {
        cancelToken: showSource.token,
        params: {
          playlist_id: options?.playlistId,
        },
      }
    );

    if (options?.deferredEventId) {
      request = blipV3.get(`/shows/deferred_template`, {
        cancelToken: showSource.token,
        params: {
          live_event_id: options?.deferredEventId,
        },
      });
    }

    request
      .then(async (showRes) => {
        const show: IBlipShow = showRes.data;

        if (options?.noLiveEvent) {
          subscriber.next({ show, eventDetails: null });
          subscriber.complete();
          return;
        }

        try {
          let epubEvent: IEventDetails = null;
          if (
            show.type === "live" &&
            show.metadata?.live_params?.live_event_id
          ) {
            const epubEventRes = await blipV3.get(
              `/live_events?event_id=${encodeURIComponent(
                show.metadata.live_params.live_event_id
              )}&limit=1000&offset=0`,
              {
                cancelToken: epubEventsSource.token,
              }
            );
            epubEvent = epubEventRes.data.events[0] || null;
            show.metadata.live_params.subscribers = epubEvent?.shows || [];
          }

          subscriber.next({ show, eventDetails: epubEvent });
          subscriber.complete();
        } catch (e) {
          subscriber.error(e);
          return;
        }
      })
      .catch((err) => {
        subscriber.error(err);
        return;
      });

    return () => {
      epubEventsSource.cancel();
      showSource.cancel();
    };
  });
  return obs;
}
```

---

## Questions

- What's `Blip`, `BlipV3`, `BlipShow`

import React, {useEffect} from 'react';
import Editor, {EventMap} from '@toast-ui/editor';
import {EventNames} from "./type";

export const TEditor = (props:any) => {
  const rootEl = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getInitEvents = () => {
      return Object.keys(props)
        .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
        .reduce((acc: Record<string, EventMap[keyof EventMap]>, key) => {
          const eventName = (key[2]!.toLowerCase() + key.slice(3)) as keyof EventMap;

          acc[eventName] = props[key as EventNames];

          return acc;
        }, {});
    };
    new Editor(
      {
        el: rootEl.current,
        ...props,
        events: getInitEvents(),
      });
  }, []);

  return (
    <div ref={rootEl} />
  );
};
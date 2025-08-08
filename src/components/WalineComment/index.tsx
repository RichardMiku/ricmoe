import React, { useEffect, useRef } from 'react';
import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from '@waline/client';

// import '@waline/client/style';
import '@site/src/css/waline.css';

export type WalineOptions = Omit<WalineInitOptions, 
  'el' | 'serverURL'> & {
  path?: string
  serverURL?: string;
};

export const Waline = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      serverURL: props.serverURL || 'https://wcomment.ric.moe',
      dark: 'html[data-theme="dark"]',
      meta: [],
      reaction: true,
      emoji: [
        '//unpkg.com/@waline/emojis@1.2.0/tw-emoji',
        '//unpkg.com/@waline/emojis@1.2.0/bilibili',
        '//unpkg.com/@waline/emojis@1.2.0/qq',
        '//unpkg.com/@waline/emojis@1.2.0/tieba',
      ],
      locale: {
        placeholder: 'Leave a comment here...',
      }
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  return <div ref={containerRef} />;
};
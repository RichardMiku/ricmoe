import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: TurnstileOptions,
      ) => string | undefined;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export interface TurnstileOptions {
  sitekey: string;
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  tabindex?: number;
  'response-field'?: boolean;
  'response-field-name'?: string;
  size?: 'normal' | 'compact';
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
}

export type TurnstileProps = Omit<TurnstileOptions, 'sitekey'> & {
  sitekey: string;
};

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

const CloudflareTurnstile: React.FC<TurnstileProps> = ({ ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let widgetId: string | undefined;

    const render = () => {
      if (ref.current && window.turnstile) {
        widgetId = window.turnstile.render(ref.current, props);
        if (widgetId) {
          widgetIdRef.current = widgetId;
        }
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          if (widgetIdRef.current) {
            window.turnstile?.remove(widgetIdRef.current);
          }
          render();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    if (window.turnstile) {
      render();
    } else {
      const script = document.createElement('script');
      script.src = `${SCRIPT_URL}?onload=onloadTurnstileCallback`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      (window as any).onloadTurnstileCallback = render;
    }

    return () => {
      observer.disconnect();
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [props]);

  return <div ref={ref} />;
};

export default CloudflareTurnstile;

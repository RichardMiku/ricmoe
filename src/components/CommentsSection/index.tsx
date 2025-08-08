import { ReactNode } from "react";
import { Waline } from "../WalineComment";
import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from '@waline/client';

export type WalineOptions = Omit<WalineInitOptions, 
  'el' | 'serverURL'> & {
  path?: string
  serverURL?: string;
};

export default function CommentsSection(props: WalineOptions) : ReactNode {
    return (
        <div className="waline-container margin-top--md">
            <Waline {...props} />
        </div>
    );
}
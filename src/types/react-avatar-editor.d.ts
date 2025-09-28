declare module 'react-avatar-editor' {
  import { Component, Ref } from 'react';

  interface AvatarEditorProps {
    ref?: Ref<AvatarEditor>;
    image: string;
    width?: number;
    height?: number;
    border?: number;
    borderRadius?: number;
    scale?: number;
    rotate?: number;
    backgroundColor?: string;
    style?: React.CSSProperties;
    onImageReady?: () => void;
    onImageChange?: () => void;
    onPositionChange?: () => void;
  }

  export default class AvatarEditor extends Component<AvatarEditorProps> {
    getImageScaledToCanvas(): HTMLCanvasElement;
    getImage(): HTMLCanvasElement;
    getCroppingRect(): { x: number; y: number; width: number; height: number };
  }
}

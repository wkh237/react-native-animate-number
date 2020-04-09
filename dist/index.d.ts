declare module 'react-native-animate-number' {
  export interface IAnimateNumberProps {
    /**
     * The value of AnimateNumber component.
     */
    value: number;
    /**
     * Set this property to force the component's value increase/decrease by this number.
     */
    countBy?: number;
    /**
     * Base interval of each animation frame, in ms. Default: `14`
     */
    interval?: number;
    /**
     * Set total frame number of animation, say, if interval is 14 and steps is 30, the animation will take 14x30ms to finish when it uses linear timing function.
     * Default: `45`
     */
    steps?: number;
    /**
     * Custom timing function or use a default timing function.
     * Default: `linear`
     */
    timing?: 'linear' | 'easeOut' | 'easeIn' | ((interval: number, progress: number) => number);
    /**
     * This prop accepts a function which returns a string as displayed value.
     */
    formatter?: (value: number) => string;
    /**
     * A function that triggers when text state has updated.
     * @param currentValue current frame's value
     * @param endValue value from props.value
     */
    onProgress?: (currentValue: number, endValue: number) => void;
    /**
     * A function that triggers when animation completes.
     */
    onFinish?: (value: number, formattedValue: number) => void;
    /**
     * Timeout in milliseconds to start animation after. Default: `0`
     */
    startAt?: number;
    /**
     * A value to start animation from. Default: `0`
     */
    initialValue?: number;
  }
  export default class AnimateNumber extends React.Component<IAnimateNumberProps> {}
}

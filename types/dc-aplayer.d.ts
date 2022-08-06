import { LitElement } from 'lit';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
/**
 * An audio player element.
 *
 * @csspart button - The buttons
 */
export declare class DCAplayer extends LitElement {
    audioElem: HTMLAudioElement;
    /**
     * The play state.
     */
    mediaUrl: string;
    /**
     * The play state.
     */
    meta: {};
    /**
     * The play state.
     */
    playing: boolean;
    /**
     * The play state RAF.
     */
    playStateRAF: number;
    /**
     * The play state RAF.
     */
    playTimePercentage: number;
    /**
     * Pointer move event over seek bar.
     */
    pointerOverSeekBarXPos: number;
    /**
     * The clip duration in seconds.
     */
    audioClipDuration: number;
    /**
     * The clip readystate of the media element.
     */
    ready: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
    render(): import("lit-html").TemplateResult<1>;
    private _mediaUrlChange;
    private _metaAttributeChange;
    private _onLoadedData;
    private _onKeyDown;
    private _getSeekVal;
    private _onDurationChange;
    private _setPointerOverSeek;
    private _clearPointerOverSeek;
    private _onTouchMove;
    private _onSeek;
    private _seekToOnTouch;
    private _fastForward;
    private _rewind;
    private _playingListener;
    private _pauseListener;
    private _playListener;
    private _togglePlay;
    private _secondsToTime;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'dc-aplayer': DCAplayer;
    }
}

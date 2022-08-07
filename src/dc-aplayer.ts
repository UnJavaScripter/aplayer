import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'

import '@polymer/iron-icon/iron-icon.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/av-icons.js'

/**
 * An audio player element.
 *
 * @csspart button - The buttons
 */
@customElement('dc-aplayer')
export class DCAplayer extends LitElement {
  @query('#audio')
  audioElem!: HTMLAudioElement

  /**
   * The play state.
   */
  @property({ type: String })
  mediaUrl = ''

  /**
   * The play state.
   */
  meta = {}

  /**
   * The play state.
   */
  
  playing: boolean = false

  /**
   * The play state RAF.
   */
  
  playStateRAF: number = 0

  /**
   * The play state RAF.
   */
  @property({ type: Number})
  playTimePercentage = 0

  /**
   * Pointer move event over seek bar.
   */
  @property({ type: Number})
  pointerOverSeekBarXPos = 0 // mcht

  /**
   * The clip duration in seconds.
   */
  @property({ type: Number})
  audioClipDuration: number = 0
  
  /**
   * The clip readystate of the media element.
   */
  @property({ type: Boolean})
  ready = false;

  connectedCallback() {
    super.connectedCallback()
    addEventListener('keydown', this._onKeyDown.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('keydown', this._onKeyDown)
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if(value && value !== _old) {
      if (this.audioElem) {
        switch (name) {
          case('mediaurl'): {
            this._mediaUrlChange(value);
            break;
          }
          case('title'): {
            this._metaAttributeChange(name, value);
            break;
          }
          case('subtitle'): {
            this._metaAttributeChange(name, value);
            break;
          }
        }
      }
    }
  }

  render() {
    return html`
      <div>
        <audio id="audio"
          controls="none"
          @seeking=${this._playingListener}
          @playing=${this._playingListener}
          @play=${this._playListener}
          @pause=${this._pauseListener}
          @durationchange=${this._onDurationChange}
          @loadeddata=${this._onLoadedData}
          hidden
        ></audio>
      </div>
      
      <div class="progress-container"
        @pointermove=${this._setPointerOverSeek}
        @pointerleave=${this._clearPointerOverSeek}
      >
        
        <div class="progress-indicator-container"
          @click=${this._onSeek}
          @touchmove=${this._onTouchMove}
          style="pointer-events: ${this.ready ? 'all' : 'none'}"
        >
          <div class="progress-indicator" style="transform: translateX(${this.playTimePercentage - 100}%)" ></div>
        </div>
        
        <div class="play-time-container"
          style="transform: translateX(${this.pointerOverSeekBarXPos}px)"
        >
          <span class="play-time">
            ${this._secondsToTime(this._getSeekVal())}
          </span>
        </div>
      </div>

      <div class="controls-container">
        <div class="media-control-buttons">
          <button tabindex="0" @click=${this._rewind} part="button" ?disabled=${!this.ready} aria-label="rewind audio 5 seconds">
            <iron-icon icon="av:replay-5"></iron-icon>
          </button>
          <button tabindex="0" @click=${this._togglePlay} part="button" ?disabled=${!this.ready} aria-label="${this.playing ? 'pause' : 'play' } audio">
            ${this.playing ? html`<iron-icon icon="av:pause-circle-filled"></iron-icon>` : html`<iron-icon icon="av:play-circle-outline"></iron-icon>`}
          </button>
          <button tabindex="0" @click=${this._fastForward} part="button" ?disabled=${!this.ready} aria-label="fast forward audio 5 seconds">
            <iron-icon icon="av:forward-5"></iron-icon>
          </button>
        </div>

        <div class="media-info">
          <div class="meta">
            <div class="title" tabindex="0" aria-label="clip title: ${this.getAttribute('title')}">${this.getAttribute('title')}</div>
            <div class="season" tabindex="0" aria-label="clip subtitle: ${this.getAttribute('subtitle')}">${this.getAttribute('subtitle')}</div>
          </div>
          <div class="elapsed-time" tabindex="0">
            <span aria-label="Current play time is ${Math.floor(this.audioElem?.currentTime)} seconds">${this._secondsToTime(this.audioElem?.currentTime)}</span>
            <span class="separator" role="separator">/</span>
            <span aria-label="total play time ${Math.floor(this.audioClipDuration)} seconds">${this._secondsToTime(this.audioClipDuration)}</span>
          </div>
        </div>
      </div>

    `
  }

  private _mediaUrlChange(mediaUrl: string) {
    this.audioElem.pause()
    this.ready = false
    this.audioElem.setAttribute('src', mediaUrl)
    this.audioElem.play()
  }

  private _metaAttributeChange(name: string, value: string) {
    this.setAttribute(name, value)
  }

  private _onLoadedData() {
    if (this.audioElem.readyState >= 2) {
      this.ready = true
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    let buttonInFocus = false
    for (let elem of (e as any).path) {
      if (elem.tagName === "BUTTON") {
        buttonInFocus = true
        break
      }

      if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
        return
      }
    }
    switch(e.key) {
      case ("ArrowLeft"): {
        this._rewind()
        break
      }
      case ("ArrowRight"): {
        this._fastForward()
        break
      }
      case (" "): {
        this._togglePlay()
        e.preventDefault()
        break
      }
    }

    if (buttonInFocus) {
      e.stopPropagation()
    }
  }

  private _getSeekVal() {
    const elementWidth = this.getBoundingClientRect().width || 0
    
    return Math.ceil((((this.pointerOverSeekBarXPos * 100) / elementWidth) * this.audioClipDuration) / 100)
  }

  private _onDurationChange() {
    this.audioClipDuration = this.audioElem.duration
  }

  private _setPointerOverSeek(e: PointerEvent) {
    this.pointerOverSeekBarXPos = e.x
  }

  private _clearPointerOverSeek() {
    this.pointerOverSeekBarXPos = 0
  }

  private _onTouchMove(e: TouchEvent) {
    const bcr = this.getBoundingClientRect()
    const dragEndLocation = e.changedTouches[0].clientX - (e.changedTouches[0].target as HTMLElement).offsetLeft

    if (dragEndLocation > bcr.width) {
      this._seekToOnTouch(bcr.width)
    } else if (dragEndLocation <= 0) {
      this._seekToOnTouch(0)
    } else {
      this._seekToOnTouch(dragEndLocation)
    }
  }

  private _onSeek(e: PointerEvent) {
    const offsetX = e.offsetX
    this._seekToOnTouch(offsetX)
  }
  
  private _seekToOnTouch(seekValue: number) {
    const bcr = this.getBoundingClientRect()
    this.playTimePercentage = (seekValue * 100) / bcr.width
    this.audioElem.currentTime = (this.audioElem.duration * this.playTimePercentage) / 100
  }
  
  private _fastForward() {
    this.audioElem.currentTime = this.audioElem.currentTime + 5
  }

  private _rewind() {
    this.audioElem.currentTime = this.audioElem.currentTime - 5
  }

  private _playingListener() {
    const playStateLoop = () => {
      
      this.playTimePercentage = (this.audioElem.currentTime * 100) / this.audioElem.duration
      if (!this.playing) {
        cancelAnimationFrame(this.playStateRAF)
      } else {
        this.playStateRAF = requestAnimationFrame(playStateLoop)
      }
    }
    this.playStateRAF = requestAnimationFrame(playStateLoop)
  }

  private _pauseListener() {
    this.playing = false
  }

  private _playListener() {
    this.playing = true
  }

  private _togglePlay() {
    if (this.playing) {
      this.audioElem.pause()
    } else {
      this.audioElem.play()
    }
  }

  private _secondsToTime(secs: number = 0){
    const h = secs >= 3600 ? Math.floor(secs / 3600).toString().padStart(2,'0') : null,
          m = Math.floor(secs % 3600 / 60).toString().padStart(2,'0'),
          s = Math.floor(secs % 60).toString().padStart(2,'0')
    
    return `${h ? `${h}:` : ''}${m}:${s}`
  }

  static styles = css`
    :host {
      margin: 0;
      padding: 0;
      text-align: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;

      --lightness-progress-bar: 53%;
      --color-progress-bar-body: hsl(0deg 79% var(--lightness-progress-bar));
      --color-progress-tip: hsl(0deg 79% calc(var(--lightness-progress-bar) + 10%));
      --color-progress-tip-highlight: hsl(0deg 79% calc(var(--lightness-progress-bar) + 20%));

      --lightness-progress-background: 23%;
      --color-progress-background: hsl(235deg 0% var(--lightness-progress-background));
      --color-progress-background-light: hsl(235deg 0% calc(var(--lightness-progress-background) + 50%));

      --color-play-time-background: hsl(0 0% var(--lightness-progress-background));
      --color-play-time-background-light: hsl(0 0% calc(var(--lightness-progress-background) + 50%));
      
      --lightness-player-body: 14%;
      --color-player-body-background: hsl(0deg 0% var(--lightness-player-body));
      --color-player-body-background-light: hsl(0deg 0% calc(var(--lightness-player-body) + 50%));

      --lightness-info-text: 75%;
      --color-info-base: hsl(0deg, 2%, var(--lightness-info-text));
      --color-info-darker: hsl(0deg, 2%, calc(var(--lightness-info-text) - 15%));
      --color-info-darkest: hsl(0deg, 2%, calc(var(--lightness-info-text) - 25%))
    }

    .progress-indicator-container {
      background-color: var(--color-progress-background);
      display: flex;
      width: 100%;
      overflow: hidden;
      align-items: center;
    }

    .progress-indicator {
      background-color: var(--color-progress-bar-body);
      height: 0.5rem;
      width: 100%;
      transform: translateX(-100%);
      border-radius: 0 3px 3px 0;
      pointer-events: none;
    }

    .progress-indicator::after {
      content: " ";
      height: 0.75rem;
      width: 0.75rem;
      background-color: var(--color-progress-tip);
      right: -0.5rem;
      top: -0.125rem;
      position: absolute;
      border-radius: 50%;
    }

    .progress-indicator-container:hover {
      cursor: pointer;
    }

    .progress-indicator-container:hover .progress-indicator::after {
      background-color: var(--color-progress-tip-highlight);
    }

    .progress-container {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }

    .progress-indicator-container:hover + .play-time-container {
      visibility: visible;
    }

    .play-time-container {
      width: 100%;
      text-align: start;
      height: 2ch;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      visibility: hidden;
      pointer-events: none;
    }

    .play-time {
      display: block;
      transform: translateX(0);
      display: inline;
      background-color: var(--color-play-time-background);
      padding: 0.5rem;
    }

    .controls-container {
      align-items: center;
      background-color: var(--color-player-body-background);
      display: grid; 
      grid-template-columns: auto 2fr;
      grid-template-rows: 1fr; 
      grid-template-areas: "buttons info"; 
      padding: 0 0.1rem;
      place-items: center start;
      justify-content: start;
      justify-items: start;
      gap: 0px 1rem;
      max-height: 4.75rem;
      align-content: center;
      height: 100vh;
    }

    .media-control-buttons {
      grid-area: buttons;
      padding: 0 0.1rem;
    }

    .media-info {
      grid-area: info;
      color: var(--color-info-base);
      text-align: start;
      display: grid;
      grid-template: "elapsed meta" 1fr / auto 2fr;
      gap: 0 1rem;
      align-items: center;
    }

    .media-info .meta {
      grid-area: meta;
      display: grid;
    }
    
    .meta .title {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta .season {
      color: var(--color-info-darker);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 0.9rem;
    }
    
    .media-info .elapsed-time {
      grid-area: elapsed;
      color: var(--color-info-darkest);
      font-size: 0.8rem
    }

    button {
      border: 1px solid transparent;
      background-color: transparent;
      padding: 0.3rem 0.6rem;
      font-size: 1rem;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
      border-radius: 3px;
    }

    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media screen and (max-width: 360px) {
      .controls-container {
        justify-items: center;
        gap: 0;
      }
      .elapsed-time {
        display: none;
      }
      .media-info {
        gap: 0;
      }
      .meta .title {
        font-size: 0.8rem;
      }
      .meta .season {
        font-size: 0.75rem;
      }
      button {
        padding: 0.15rem 0.3rem;
      }
    }

    @media (min-width:361px) and (max-width: 720px) {
      .controls-container {
        grid-template-columns: auto auto;
        gap: 0 0.1rem;
      }
      .media-info {
        grid-template: "meta meta" "elapsed elapsed";
      }
      .media-control-buttons {
        min-width: 9.25rem;
      }
      .meta .title {
        font-size: 1rem;
      }
      .meta .season {
        font-size: 0.8rem;
      }
    }

    @media (prefers-color-scheme: light) {
      .play-time {
        background-color: var(--color-play-time-background-light);
      }
      .progress-indicator-container {
        background-color: var(--color-progress-background-light);
      }
      .controls-container {
        background-color: var(--color-player-body-background-light);
      }
      button {
        background-color: var(--color-button-background-light);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'dc-aplayer': DCAplayer
  }
}

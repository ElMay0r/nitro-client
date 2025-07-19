import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
    selector: 'nitro-room-chatinput-emojiselector-component',
    template: `
    <div class="nitro-room-chatinput-emojiselector-component">
        <i class="icon icon-sign-smile" (click)="toggleSelector()"></i>
        <div [bringToTop] class="nitro-emojiselector card p-3" [ngClass]="{ 'active': showEmojis }">
            <div class="grid-container w-100">
                <div class="grid-items grid-5">
                    <div class="d-flex flex-column item-detail justify-content-center align-items-center" *ngFor="let emoji of emojis" (click)="selectEmoji(emoji)">
                        <span class="emoji">{{ emoji }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class RoomChatInputEmojiSelectorComponent implements OnInit, OnDestroy
{
    @Output()
    public emojiSelected = new EventEmitter<string>();

    public showEmojis = false;
    public emojis: string[] = ['😀','😁','😂','😅','😍','😎','😭','😡','👍','👎','❤️','🎉','😜','🤔','😢','🤯','😇','😱','🙌','💯'];

    public ngOnInit(): void
    {}

    public ngOnDestroy(): void
    {
        this.hideSelector();
    }

    private showSelector(): void
    {
        this.showEmojis = true;
    }

    private hideSelector(): void
    {
        this.showEmojis = false;
    }

    public toggleSelector(): void
    {
        if(this.showEmojis)
        {
            this.hideSelector();
            return;
        }
        this.showSelector();
    }

    public selectEmoji(emoji: string): void
    {
        this.emojiSelected.emit(emoji);
        this.hideSelector();
    }
}

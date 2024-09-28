import { VariantProps, cva } from 'class-variance-authority';
import { Component, computed, input } from '@angular/core';
import { ClassArray, ClassValue } from 'clsx';
import { combine } from '@shared/utils';

const chatContainerVariants = cva(`daisy-chat`, {
  variants: {
    position: {
      start: `daisy-chat-start mr-auto`,
      end: `daisy-chat-end ml-auto`,
    },
  },
  defaultVariants: {
    position: 'start',
  },
});

const chatBubbleVariants = cva(`daisy-chat-bubble`, {
  variants: {
    mode: {
      primary: `daisy-chat-bubble-primary`,
      secondary: `daisy-chat-bubble-secondary`,
      accent: `daisy-chat-bubble-accent`,
      info: `daisy-chat-bubble-info`,
      success: `daisy-chat-bubble-success`,
      warning: `daisy-chat-bubble-warning`,
      error: `daisy-chat-bubble-error`,
    },
  },
  defaultVariants: {
    mode: 'primary',
  },
});

export type ChatContainerVariant = VariantProps<typeof chatContainerVariants>;
export type ChatBubbleVariant = VariantProps<typeof chatBubbleVariants>;

@Component({
  template: `
    <div [class]="generatedContainer()">
      @if (imgSrc()) {
        <div class="daisy-avatar daisy-chat-image">
          <div class="w-10 rounded-full">
            <img [src]="imgSrc()" alt="avatar" />
          </div>
        </div>
      }
      @if (userName()) {
        <div class="daisy-chat-header">{{ userName() }}</div>
      }
      <div [class]="generatedBubble()">
        <ng-content />
      </div>
    </div>
  `,
  selector: 'app-chat-bubble',
  standalone: true,
})
export class ChatBubbleComponent {
  public readonly userName = input<string>();
  public readonly imgSrc = input<string>();

  public readonly position = input<ChatContainerVariant['position']>();
  public readonly size = input<ChatBubbleVariant['mode']>();

  public readonly containerClasses = input<ClassValue | ClassArray>([], {
    alias: 'containerClass',
  });
  public readonly bubbleClasses = input<ClassValue | ClassArray>([], {
    alias: 'bubbleClass',
  });

  public readonly generatedContainer = computed(() =>
    combine(
      chatContainerVariants({ position: this.position() }),
      this.containerClasses(),
    ),
  );
  public readonly generatedBubble = computed(() =>
    combine(chatBubbleVariants({ mode: this.size() }), this.containerClasses()),
  );
}

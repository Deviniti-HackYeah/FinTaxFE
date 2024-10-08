import { TemplateRef, Component, computed, input } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { CommonModule } from '@angular/common';
import { ClassArray, ClassValue } from 'clsx';
import { combine } from '@shared/utils';

const chatContainerVariants = cva(`daisy-chat mb-2`, {
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

const chatBubbleVariants = cva(`daisy-chat-bubble p-4`, {
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
          <div class="w-14 rounded-full">
            <img [src]="imgSrc()" alt="avatar" />
          </div>
        </div>
      }
      @if (userName()) {
        <div class="daisy-chat-header mb-1 text-light">{{ userName() }}</div>
      }
      @if (userTemplate()) {
        <ng-container [ngTemplateOutlet]="userTemplate()!" />
      }
      <div [class]="generatedBubble()">
        <ng-content />
      </div>
    </div>
  `,
  selector: 'app-chat-bubble',
  imports: [CommonModule],
  standalone: true,
})
export class ChatBubbleComponent {
  public readonly userTemplate = input<TemplateRef<HTMLElement>>();
  public readonly userName = input<string>();
  public readonly imgSrc = input<string>();

  public readonly position = input<ChatContainerVariant['position']>();
  public readonly mode = input<ChatBubbleVariant['mode']>();

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
    combine(chatBubbleVariants({ mode: this.mode() }), this.containerClasses()),
  );
}

import { ReactNode } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
}

export function SplitText({ children, className = '' }: SplitTextProps) {
  const words = children.split(' ');

  return (
    <span aria-label={children} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block split-char"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}

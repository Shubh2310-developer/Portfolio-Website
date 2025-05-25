import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterProps {
  words: string[];
  loop?: boolean;
  delay?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

interface UseTypewriterReturn {
  text: string;
  count: number;
  isDeleting: boolean;
  isPaused: boolean;
  currentWord: string;
}

export function useTypewriter({
  words,
  loop = true,
  delay = 2000,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
}: UseTypewriterProps): UseTypewriterReturn {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(typingSpeed);

  const currentWord = words[count];

  const handleTyping = useCallback(() => {
    if (isPaused) return;

    const shouldDelete = isDeleting;
    const shouldMoveToNextWord = !shouldDelete && text === currentWord;
    const shouldStartDeleting = shouldMoveToNextWord && loop;

    if (shouldStartDeleting) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
        setSpeed(deletingSpeed);
      }, pauseTime);
    } else if (shouldDelete) {
      setText(currentWord.substring(0, text.length - 1));
      setSpeed(deletingSpeed);
    } else {
      setText(currentWord.substring(0, text.length + 1));
      setSpeed(typingSpeed);
    }

    if (shouldDelete && text === '') {
      setIsDeleting(false);
      setCount((count + 1) % words.length);
      setSpeed(delay);
    }
  }, [
    text,
    count,
    isDeleting,
    isPaused,
    currentWord,
    loop,
    delay,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [handleTyping, speed]);

  return {
    text,
    count,
    isDeleting,
    isPaused,
    currentWord,
  };
}

// Helper function to get typing speed based on word length
export function getTypingSpeed(word: string): number {
  const baseSpeed = 100;
  const lengthFactor = Math.max(0.5, Math.min(1.5, word.length / 10));
  return Math.floor(baseSpeed * lengthFactor);
}

// Helper function to get deleting speed based on word length
export function getDeletingSpeed(word: string): number {
  const baseSpeed = 50;
  const lengthFactor = Math.max(0.5, Math.min(1.5, word.length / 10));
  return Math.floor(baseSpeed * lengthFactor);
}

// Helper function to get pause time based on word length
export function getPauseTime(word: string): number {
  const baseTime = 1000;
  const lengthFactor = Math.max(0.5, Math.min(1.5, word.length / 10));
  return Math.floor(baseTime * lengthFactor);
}

// Helper function to get delay between words
export function getWordDelay(word: string): number {
  const baseDelay = 2000;
  const lengthFactor = Math.max(0.5, Math.min(1.5, word.length / 10));
  return Math.floor(baseDelay * lengthFactor);
}

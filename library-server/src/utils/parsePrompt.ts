type QueryIntent =
  | 'GET_OVERDUE_BOOKS'
  | 'COUNT_TOTAL_BOOKS'
  | 'LIST_BOOKS_DUE_THIS_WEEK'
  | 'COUNT_OVERDUE_BOOKS'
  | 'FIND_BY_AUTHOR'
  | 'NONE';

export function parsePrompt(prompt: string): QueryIntent {
  const lower = prompt.toLowerCase();

  if (lower.includes('overdue') && lower.includes('books')) {
    if (lower.includes('how many') || lower.includes('count')) {
      return 'COUNT_OVERDUE_BOOKS';
    }
    return 'GET_OVERDUE_BOOKS';
  }

  if (lower.includes('books due') && lower.includes('week')) {
    return 'LIST_BOOKS_DUE_THIS_WEEK';
  }

  return 'NONE';
}

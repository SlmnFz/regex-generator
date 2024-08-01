# Regex Flags Explained

When working with regular expressions, flags are crucial for controlling how the regex is processed and matched against strings. Here’s a quick overview of common regex flags and their usage:

## Flags Overview

- **`i` - Case-Insensitive Matching**
  - **Purpose**: Allows the regex to match characters regardless of their case.
  - **Usage**: `const regex = /pattern/i;`
  - **Example**: `/hello/i` matches both "hello" and "HELLO".

- **`g` - Global Matching**
  - **Purpose**: Ensures that the regex matches all occurrences within the string, not just the first.
  - **Usage**: `const regex = /pattern/g;`
  - **Example**: `/foo/g` finds all instances of "foo" in a string.

- **`m` - Multiline Mode**
  - **Purpose**: Changes the behavior of `^` and `$` so they match the start and end of each line, not just the start and end of the string.
  - **Usage**: `const regex = /pattern/m;`
  - **Example**: `/^foo/m` matches "foo" at the start of any line in a multiline string.

- **`u` - Unicode Matching**
  - **Purpose**: Enables full Unicode matching, allowing for matching of Unicode characters.
  - **Usage**: `const regex = /pattern/u;`
  - **Example**: `/\u{1F600}/u` matches the 😀 emoji.

- **`y` - Sticky Mode**
  - **Purpose**: Ensures the regex matches only from the exact position in the string where it was last matched.
  - **Usage**: `const regex = /pattern/y;`
  - **Example**: `/foo/y` matches "foo" only if it occurs at the last matched position.

## Example Usage

Here’s how you can use these flags in the `setFlags` method of the `RegexGenerator` class:

```javascript
const reg = new RegexGenerator();
reg.setFlags({ caseInsensitive: true, global: true });
// This sets the regex to be case-insensitive and global.
```

Each flag modifies how the regex engine performs matching, and combining them allows for powerful and flexible pattern matching.

Feel free to reach out if you have any questions or need further clarification!
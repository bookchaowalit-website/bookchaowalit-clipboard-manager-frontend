# Clipboard Manager — Product brief

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Repository evidence suggests developers and knowledge workers who repeatedly
reuse short text snippets while working in the browser.

## Product Purpose

Save, find, pin, copy, and remove text snippets locally. Success means a saved
snippet can be recovered faster than recreating or searching for it elsewhere.

## Positioning

The product is an honest local-only snippet shelf: it does not passively read
the system clipboard and it does not send saved content to a server.

## Operating Context

The user pastes or types a snippet, saves it, searches the local collection,
pins frequently reused items, and copies one back into another workflow.

## Capabilities and Constraints

- Add, search, pin, copy, and delete snippets.
- Persist data with browser `localStorage`.
- Passive clipboard listening is blocked by browser security and is out of scope.
- The app is a portfolio utility, not a synchronized multi-device service.

## Brand Commitments

The product is part of the Bookchaowalit developer-tools portfolio and must
state its local-only boundary plainly.

## Evidence on Hand

- `README.md` documents the feature and browser limitation.
- `app/page.tsx` contains the local snippet workflow.
- No cloud sync, account, or external message delivery is claimed.

## Product Principles

- Respect the privacy of copied text.
- Make retrieval faster than retyping.
- Keep storage and limitations visible.

## Accessibility & Inclusion

Provide labeled form controls, keyboard-operable actions, visible focus, and
clear empty and error states.

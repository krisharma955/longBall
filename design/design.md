# Football Extension — UI Design Specification

> Visual reference: Apple Sports iPhone live-scores screen. This document translates the reference into a design system and interaction guidelines for the football sidebar extension. The goal is to reproduce the **visual language and hierarchy**, not copy Apple branding or mobile layout literally.

## 1. Design direction

- **Style:** premium sports scoreboard; dark, restrained, compact, information-first.
- **Mood:** live, focused, modern, polished.
- **Primary surface:** near-black.
- **Accent:** emerald green, used for active states, live emphasis, and subtle gradients.
- **Typography:** clean sans-serif; bold scores and team names, muted secondary labels.
- **Avoid:** loud neon, excessive borders, gradients on every card, clutter, overly rounded “toy-like” UI, purple accents.

The UI should feel like a sports product that can remain open beside a browser tab without being distracting.

## 2. Layout and density

The extension is a **browser sidebar**. Adapt the reference's vertically stacked score cards to the narrow sidebar width.

### Sidebar shell
- Width should follow the browser sidebar's available width; design for a narrow viewport first.
- Keep a single vertical scroll area for match content.
- Header and date navigation should remain visually distinct from the scrolling list.
- Use consistent side padding: approximately `14–16px`.
- Use compact vertical spacing: `8–12px` between cards and `16–20px` between sections.

### Recommended hierarchy
1. App header
2. Date selector / day tabs
3. Live and scheduled match list
4. “Later today” / upcoming section divider
5. Additional matches

## 3. Color tokens

Approximate colors sampled visually from the reference. Use CSS variables and adjust only if the implementation requires contrast/accessibility improvements.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#050606` | Main app background |
| `--surface` | `#171919` | Match cards and secondary surfaces |
| `--surface-raised` | `#202222` | Hover/expanded card surface |
| `--surface-muted` | `#252727` | Secondary content surfaces |
| `--text-primary` | `#F5F6F6` | Main labels, scores |
| `--text-secondary` | `#A2A7A7` | Team labels, league labels |
| `--text-tertiary` | `#727878` | Quiet metadata |
| `--emerald` | `#18B86A` | Accent / selected state |
| `--emerald-deep` | `#075B32` | Header gradient / accent tint |
| `--live` | `#F04444` | Live status only, sparingly |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Hairline separators if needed |

### Background treatment
- Main page: flat black/near-black.
- Header area: optional very subtle emerald gradient fading into the black surface.
- Match cards: charcoal; **do not** add a strong colored gradient to every card.
- Any team/league tint should be a faint wash only, used selectively and with reduced opacity.

## 4. Typography

Use the project's existing font if it is already established. Otherwise, prefer a modern system sans stack.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Type hierarchy
- App title: `22–26px`, semibold/bold.
- Section/date tabs: `13–15px`, medium.
- Competition/league label: `11–12px`, medium, muted.
- Team name: `12–14px`, medium.
- Score: `28–34px`, bold, tabular numerals.
- Match clock / kickoff time: `13–15px`, semibold.
- Supporting status: `11–12px`, muted.

Use tabular numbers for scores, standings, and times to prevent shifting.

## 5. App header

### Structure
- Left: football app mark/icon + product name.
- Right: compact favorite teams control (star icon + “My Teams” or equivalent).
- Header height: approximately `56–64px`.
- Horizontal alignment: center vertically, with comfortable spacing.
- Header background can have a subtle emerald glow/gradient at the top, fading before the match list.

### Behavior
- Clicking the favorites control opens the user's followed clubs/leagues management view.
- Selected/followed items should use emerald accent.
- Keep the header controls compact; avoid large pill buttons.

## 6. Date navigation

Use a simple three-way segmented date navigation:
- **Yesterday**
- **Today**
- **Upcoming**

### Appearance
- Horizontal, evenly distributed.
- Active tab: high-contrast text.
- Inactive tabs: muted gray.
- A subtle underline, pill, or background tint may indicate active selection; use one indicator, not multiple.
- Keep it compact enough to preserve screen space.

### Behavior
- Tabs switch the match date/filter.
- “Today” is selected by default.
- Date selection must update fixture data and empty states.

## 7. Match cards

The reference uses stacked rounded score cards. Match cards are the core UI component.

### Card dimensions and shape
- Full available width.
- Approximately `100–116px` tall depending on the sidebar layout and metadata.
- Border radius: `18–22px`.
- Internal padding: `12–16px`.
- Card gap: `8–10px`.
- Background: charcoal with optional very subtle team-color tint.

### Card information hierarchy
Each card should contain:
1. Competition / league label at top center or aligned to the metadata row.
2. Home team area.
3. Match status or kickoff time centered.
4. Away team area.
5. Score or record (depending on match state).
6. Favorite affordance, if present.

### Layout guidance
- Teams occupy the left and right sides.
- Score is prominent, aligned near the center.
- Match clock/status is smaller and centered between or above score values.
- Team crests/logos are compact and consistent in size.
- Team name is muted but readable below or adjacent to crest.
- Favoriting uses a small star; it must not compete with the score.

For a narrow sidebar, allow the team name to truncate gracefully. Do not let long club names push score columns out of alignment.

## 8. Match states

### Live
- Display score with strong primary contrast.
- Display a live clock or phase (e.g. `63'`, `HT`, `2nd half`).
- Add a small live indicator in emerald or red; choose one treatment consistently.
- Live matches should sort/group according to the product's chosen rules.

### Upcoming
- Show kickoff time.
- Show team names and crests.
- Optional form/record or odds are secondary and should only appear if the data source provides them.
- No score values should be invented or shown as `0–0` before kickoff unless the API explicitly provides it.

### Finished
- Show final score.
- Status text: `FT` / `Final`.
- Scores remain prominent, but finished matches may have slightly reduced emphasis compared to live matches.

### Postponed / cancelled / delayed
- Status should be clear and textual.
- Preserve team layout.
- Do not use score emphasis as if the game were live.

## 9. Section dividers and upcoming list

The reference uses a small uppercase “Later Today” label with a show-more/show-less affordance.

### Style
- Uppercase or small-caps-style section label.
- Muted text.
- Compact chevron control aligned to the right.
- `12–16px` spacing above the section.

### Behavior
- Expand/collapse upcoming matches.
- The chevron should rotate or switch direction.
- Use a clear accessible label (`Show more matches` / `Show fewer matches`).

## 10. Favorite teams

- Star icon is small, simple, and consistently placed.
- Unselected: muted/low contrast.
- Selected: white or emerald, depending on the card context.
- Clicking the star should toggle favorite without opening match details.
- Favorite matches/teams can receive priority in the list, but do not duplicate matches.

## 11. Match details popup / panel

**Required interaction:** clicking a match opens a detail popup/panel from within the sidebar. The user should remain in the extension context.

### Opening
- The match card is a click target.
- Favorite control is a separate click target and must not trigger the details panel.
- Use a slide-in panel, nested view, or anchored overlay that fits the sidebar.
- Preserve a clear back affordance to return to the list.

### Detail view hierarchy
1. Competition name and round/matchday, when available.
2. Match status / kickoff date and time.
3. Home vs. away teams with larger crests and names.
4. Score (live/final) or kickoff time (upcoming).
5. Tabs or sections for available match data (e.g. Overview, Stats, Lineups, Events).
6. Events/timeline and stats only when supplied by the data source.

### Visual treatment
- Same black/charcoal surfaces.
- Slightly larger team presentation than list cards.
- Emerald accent for active tabs and live status.
- Avoid modal styling that looks like a generic web alert.

## 12. Interaction and motion

- Hover: card surface brightens subtly; optional `translateY(-1px)` only if it feels restrained.
- Press: reduce scale very slightly (`0.99`) or use a surface change.
- Transitions: `140–200ms`, ease-out.
- Tab changes: quick fade or small slide; no elaborate animations.
- Expand/collapse: animate height/opacity only if it remains smooth and does not cause layout jank.
- Respect reduced-motion preferences.

## 13. Iconography

- Use one icon family (Lucide is preferred if already in the project).
- Icons should be thin/clean and consistent in stroke.
- Favorites: star.
- Expand/collapse: chevron.
- Navigation/back: arrow-left.
- Avoid emoji as primary UI icons.
- Team crests should use actual club assets/logos from a legitimate data source when available.

## 14. Responsive and accessibility rules

- Sidebar is the primary target; do not design desktop-wide layouts first.
- Keep tap/click targets comfortably usable (aim for `32–40px` for compact controls; larger where practical).
- Maintain contrast for muted labels.
- Provide accessible names for icon-only buttons.
- Keyboard support: focus-visible states for tabs, favorite buttons, match cards, and panel navigation.
- Avoid relying on color alone to communicate match state.
- Truncate long names with an accessible full-name tooltip or title.
- Ensure the match card can be navigated and activated with keyboard.

## 15. Data integrity

- Match details must be driven by the API.
- Do not hardcode sample scores, clocks, fixtures, standings, or team records in production UI.
- Show loading, error, empty, and stale-data states.
- If live updates are unavailable, label the data as last updated rather than implying it is realtime.
- Use a consistent date/time zone policy and clearly format kickoff time in the user's local timezone.

## 16. States to design

Implement and verify these states:
- Loading matches
- Live matches
- Upcoming fixtures
- Finished matches
- No matches for selected date
- API/network error
- Stale data / last updated
- Expanded upcoming section
- Favorite team selected / unselected
- Match details opened
- Match details loading/error/empty data

## 17. CSS starter tokens

```css
:root {
  color-scheme: dark;

  --bg: #050606;
  --surface: #171919;
  --surface-raised: #202222;
  --surface-muted: #252727;

  --text-primary: #f5f6f6;
  --text-secondary: #a2a7a7;
  --text-tertiary: #727878;

  --accent: #18b86a;
  --accent-deep: #075b32;
  --live: #f04444;

  --border-subtle: rgba(255, 255, 255, 0.06);

  --radius-card: 20px;
  --radius-control: 12px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
}
```

## 18. Design implementation checklist

- [ ] Dark near-black background established.
- [ ] Emerald accent used intentionally, not everywhere.
- [ ] Header, date tabs, and match list have clear hierarchy.
- [ ] Match cards have consistent heights, padding, and alignment.
- [ ] Team logos and names never disrupt score alignment.
- [ ] Live/upcoming/final states are visually distinct.
- [ ] Favorites toggle independently from card click.
- [ ] “Later today”/upcoming section can expand and collapse.
- [ ] Match click opens an in-sidebar detail view.
- [ ] Loading, empty, error, and stale states are designed.
- [ ] Focus and hover states are visible and restrained.
- [ ] No fabricated match data in the production UI.

---

## Design principle

**Make the match the hero.** Everything else—league labels, kickoff times, favorites, and secondary actions—should support the score and matchup, not compete with it.

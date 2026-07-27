# SGT. RUKA

A vertically scrolling run-and-gun in the browser: eight stages behind enemy
lines, a rifle that fires in eight directions, and grenades that only ever fly
forward. Everything is in a single `index.html` — no libraries, no build step.

**[▶ Play it here](https://ulebule.github.io/sgt-ruka/)**

## Not a conversion

This is an original game written for this project, not a port. The soldier, the
stages and the artwork are my own; no code, sprite or character from any
published game is used. What it takes from the 1985 coin-op school of the genre
is the shape of the thing: the battlefield scrolls at you from the top, cover
can be blown apart, prisoners are worth rescuing, and every stage ends at a
fortress gate that pours out soldiers behind a fleeing officer.

## Controls

Arrow keys or `WASD` move — and the direction you walk is the direction you
shoot, exactly as a one-stick coin-op did it. `SPACE` fires, `G` throws a
grenade, `P` pauses, `M` toggles sound, `L` cycles the language and `N` changes
your name.

Pushing forward speeds up the advance, so you set your own pace between careful
and reckless.

**Touch** — no on-screen buttons. The left half of the screen is the stick:
drag to walk and aim. The right half is the trigger: hold to fire, swipe up to
throw a grenade.

## The fight

The rifle has unlimited ammunition; grenades do not, and you start each life
with six. A grenade flies a fixed distance ahead of you and detonates there —
or against the first sandbag wall or hut it meets, which is how you open a path
through cover. Rocks and trees cannot be destroyed.

Enemy soldiers charge and shoot, riflemen pop up from trenches, and officers
keep their distance and lob grenades back at you. Prisoners are dragged across
the battlefield by a guard: shoot the guard and the prisoner is worth 1000
points, but a stray bullet kills them.

At the end of a stage the scrolling stops at the gate. Clear the wave and the
stage is yours. Shooting the officer before he flees is worth 3000.

Three lives, an extra one at 10 000 points and then every 50 000. Two-player
games alternate, life by life, the way the coin-op did it.

## Score board

Scores are shared online through Firebase, with a top-ten table on the title
and game-over screens. With no connection the game keeps working and falls back
to scores stored in the browser. Two-player games are friendlies and are not
submitted.

## Languages

English, Slovenian, German, Italian and French, detected from the device and
switchable with `L` or the on-screen button.

## Install it

The game is a PWA: a browser will offer to add it to the home screen (on iOS,
Share → *Add to Home Screen*), and it then opens standalone. A service worker
caches the page, so after the first visit it runs with no connection at all —
the score board naturally needs the network and falls back to local scores.

## Licence

MIT

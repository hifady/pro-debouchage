@AGENTS.md

Claude Code specific rules go below this line.

A main session (never a subagent) starts with the day's skill, which reads the state files: `/orch` (it resumes a day already started by itself), `/orch-mid`, `/eof`, or `/decide` for Fady's decision sitting. With no skill, read `STATE.md`, `NOW.md` and `HANDOFF.md` first. Read anything else only when the work touches it.

# Compact instructions
When compacting, keep: Fady's requests in his own words, every decision and his widget answers, the files written this session, what is still open and who owns it, and the last `date` output.

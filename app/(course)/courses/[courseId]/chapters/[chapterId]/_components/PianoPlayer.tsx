"use client";

import { useEffect, useState } from "react";
import { Piano, KeyboardShortcuts } from "react-piano";
import Soundfont from "soundfont-player";
import "react-piano/dist/styles.css";

const firstNote = 48; // C3
const lastNote = 65;  // F4

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote,
  lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

// Генерация названий нот по MIDI
const noteNamesMap: Record<number, string> = {};
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
for (let midi = firstNote; midi <= lastNote; midi++) {
  const note = notes[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  noteNamesMap[midi] = `${note}${octave}`;
}

export default function PianoPlayer() {
  const [player, setPlayer] = useState<any>(null);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    Soundfont.instrument(ctx, "acoustic_grand_piano").then(setPlayer);
  }, []);

  const playNote = (midiNumber: number) => {
    if (!player) return;
    player.play(midiNumber);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 text-center">
      <h2 className="text-xl font-semibold mb-4">🎹 Интерактивное пианино</h2>

      <button
        onClick={() => setShowLabels((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showLabels ? "Скрыть названия нот" : "Показать названия нот"}
      </button>

      {player ? (
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={playNote}
          stopNote={() => {}}
          width={700}
          keyboardShortcuts={keyboardShortcuts}
          renderNoteLabel={({ midiNumber }) =>
            showLabels ? (
              <div
                style={{
                  fontSize: "10px",
                  color: "#111",
                  textAlign: "center",
                  marginTop: "4px",
                }}
              >
                {noteNamesMap[midiNumber]}
              </div>
            ) : null
          }
        />
      ) : (
        <p className="text-sm text-muted">Загрузка звуков...</p>
      )}
    </div>
  );
}

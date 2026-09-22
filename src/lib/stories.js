// A story branches when the catalogue lists 2+ endings.
// Only branching stories show endings; linear ones show "Completed".
export const isBranching = (story) => (story.endingsTotal ?? 0) >= 2

// Completed = the last run reached an ending (a replay in progress goes back to "Continue")
export const isCompleted = (progress) => progress?.status === 'finished'

// What a story calls its endings, e.g. Storm Alert's 4 "outcomes"
export const endingsWord = (story) => story.endingsLabel ?? 'endings'

# 3D Tic Tac Toe

A 3D tic-tac-toe game built with Next.js and Three.js.

## Features

- 🎮 3D wooden game board
- 🎯 9 columns, each can hold up to 3 tokens
- 🎨 Two wood grain colored tokens (dark and light)
- 🖱️ Mouse drag to control camera view
- 👆 Click columns to place tokens
- 🔄 Turn-based game mechanics

## Installation and Running

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Game Rules

- Players take turns placing tokens
- Each column can hold up to 3 tokens
- Win by getting 3 tokens in a row in any direction:
  - Horizontal lines within each layer
  - Vertical lines (same column)
  - Diagonal lines within each layer
  - 3D space diagonals across layers

## Technology Stack

- **Next.js** - React framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **TypeScript** - Type safety
- **Jest** - Testing framework

## Project Structure

```
app/
├── components/          # React components
│   ├── Scene.tsx       # Main 3D scene
│   ├── GameBoard.tsx   # Game board logic
│   ├── Token.tsx       # Token component
│   ├── Column.tsx      # Column component
│   ├── Base.tsx        # Base component
│   └── VictoryAnimation.tsx # Victory animation
├── utils/              # Utility functions
│   ├── GameLogic.ts    # Game logic
│   ├── MaterialFactory.ts # Material creation
│   ├── AnimationManager.ts # Animation logic
│   └── winDetection/   # Win condition strategies
└── types/              # TypeScript types
```

## Testing

Run tests with coverage:

```bash
npm run test:coverage
```

The test suite covers all 49 win conditions and game logic.

## Development

This project follows SOLID principles with:

- Strategy pattern for win detection
- Factory pattern for materials
- Separation of concerns between components
- Comprehensive test coverage

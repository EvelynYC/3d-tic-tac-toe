# 3D Tic Tac Toe Automated Testing

This directory contains a comprehensive automated test suite for the 3D Tic Tac Toe game.

## 📁 Test File Structure

```
__tests__/
├── GameLogic.test.ts          # Main game logic tests
├── CrossLayerWin.test.ts      # Cross-layer diagonal win detection tests
├── run-tests.sh              # Test execution script
└── README.md                 # This file
```

## 🧪 Test Coverage

### GameLogic.test.ts

- ✅ **Plane Line Detection**: 3x3 grid rows and columns within each layer
- ✅ **Vertical Line Detection**: Three identical tokens in the same column
- ✅ **Plane Diagonal Detection**: Main and anti-diagonals within each layer
- ✅ **Cross-layer Diagonal Detection**: All cross-layer diagonal combinations
- ✅ **No Win Conditions**: Empty states, incomplete lines, different colors, etc.
- ✅ **Edge Cases**: Undefined columns, empty columns, etc.
- ✅ **Other Methods**: canPlaceToken, isColumnFull, isGameEmpty

### CrossLayerWin.test.ts

Specifically tests all 16 cross-layer diagonal line combinations:

- ✅ **4 True 3D Space Diagonals**: Through-center diagonals (2 lines × 2 directions)
- ✅ **12 Side-specific Diagonals**: Edge and side face diagonals (6 lines × 2 directions)

## 🎯 Win Condition Categories

The game has **49 total win conditions**:

### 1. Plane Lines (18 combinations)

- **3 layers × 3 rows = 9 horizontal lines**
- **3 layers × 3 columns = 9 vertical lines**

### 2. Vertical Lines (9 combinations)

- **9 columns × 1 vertical line each = 9 vertical lines**

### 3. Plane Diagonals (6 combinations)

- **3 layers × 2 diagonals = 6 diagonal lines**

### 4. Cross-layer Diagonals (16 combinations)

- **2 through-center diagonals** (each with 2 directions = 4)
- **6 side-specific diagonals** (each with 2 directions = 12)

## 🚀 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npm test GameLogic.test.ts
npm test CrossLayerWin.test.ts
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

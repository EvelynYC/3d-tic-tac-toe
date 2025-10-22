# 3D Tic Tac Toe Automated Testing

This directory contains a comprehensive automated test suite for the 3D Tic Tac Toe game.

## 🎮 3D Board Position Reference

```
3D Board Position Reference (3x3x3 = 27 positions)

Layer 0 (Bottom):    Layer 1 (Middle):    Layer 2 (Top):
[0] [1] [2]         [0] [1] [2]         [0] [1] [2]
[3] [4] [5]         [3] [4] [5]         [3] [4] [5]
[6] [7] [8]         [6] [7] [8]         [6] [7] [8]
```

Each position is identified by `{ column, layer }` where:

- **Column**: 0-8 (horizontal position within each layer)
- **Layer**: 0-2 (vertical position across layers)
- **Total**: 9 columns × 3 layers = 27 positions

## 📁 Test File Structure

```
__tests__/
├── GameLogic.test.ts          # Core game logic and utility methods
├── PlaneLines.test.ts        # Plane line win detection (18 combinations)
├── VerticalLines.test.ts     # Vertical line win detection (9 combinations)
├── PlaneDiagonals.test.ts    # Plane diagonal win detection (6 combinations)
├── CrossLayerDiagonals.test.ts # Cross-layer diagonal win detection (16 combinations)
├── run-tests.sh              # Test execution script
└── README.md                 # This file
```

## 🧪 Test Coverage

### GameLogic.test.ts

- ✅ **Basic Win Detection**: Examples of all win types
- ✅ **No Win Conditions**: Empty states, incomplete lines, different colors, etc.
- ✅ **Edge Cases**: Undefined columns, empty columns, etc.
- ✅ **Other Methods**: canPlaceToken, isColumnFull, isGameEmpty

### PlaneLines.test.ts

Tests all 18 plane line combinations:

- ✅ **Layer 0 (Bottom)**: 6 tests (3 rows + 3 columns)
- ✅ **Layer 1 (Middle)**: 6 tests (3 rows + 3 columns)
- ✅ **Layer 2 (Top)**: 6 tests (3 rows + 3 columns)

### VerticalLines.test.ts

Tests all 9 vertical line combinations:

- ✅ **Column 0-8**: Each column's internal vertical line

### PlaneDiagonals.test.ts

Tests all 6 plane diagonal combinations:

- ✅ **Layer 0**: 2 tests (main + anti-diagonal)
- ✅ **Layer 1**: 2 tests (main + anti-diagonal)
- ✅ **Layer 2**: 2 tests (main + anti-diagonal)

### CrossLayerDiagonals.test.ts

Tests all 16 cross-layer diagonal combinations:

- ✅ **4 True 3D Space Diagonals**: Through-center diagonals (2 lines × 2 directions)
- ✅ **12 Side-specific Diagonals**: Edge and side face diagonals (6 lines × 2 directions)

## 📊 Test Statistics

**Total Test Cases: 80**

| Test File                       | Test Cases | Description                         |
| ------------------------------- | ---------- | ----------------------------------- |
| **GameLogic.test.ts**           | 31         | Core game logic and utility methods |
| **PlaneLines.test.ts**          | 18         | Plane line win detection            |
| **CrossLayerDiagonals.test.ts** | 16         | Cross-layer diagonal win detection  |
| **VerticalLines.test.ts**       | 9          | Vertical line win detection         |
| **PlaneDiagonals.test.ts**      | 6          | Plane diagonal win detection        |

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
npm test PlaneLines.test.ts
npm test VerticalLines.test.ts
npm test PlaneDiagonals.test.ts
npm test CrossLayerDiagonals.test.ts
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

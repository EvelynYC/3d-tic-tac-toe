#!/bin/bash

echo "🧪 Running 3D Tic Tac Toe Automated Tests"
echo "=========================================="

echo ""
echo "📦 Installing test dependencies..."
npm install

echo ""
echo "🔍 Running all tests..."
npm run test

echo ""
echo "📊 Generating test coverage report..."
npm run test:coverage

echo ""
echo "✅ Tests completed!"

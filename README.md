# 🐾 Cyber Pet Habitat

A nostalgic digital pet simulator inspired by Tamagotchi, featuring a retro Windows 98 aesthetic. Create, care for, and interact with your virtual pet companion!

## ✨ Features

- **Pet Creation Quiz**: Answer personality questions to determine your unique pet type
- **5 Different Pet Types**:
  - 🐱 Fluffy (Cat) - Playful and energetic
  - 🦎 Scaly (Lizard) - Intelligent and calm
  - 🐶 Furry (Dog) - Active and friendly
  - 🐦 Feathery (Bird) - Graceful and energetic
  - 🐸 Slimy (Frog) - Curious and playful

- **Interactive Care System**:
  - 🍎 Feed your pet to maintain hunger
  - 🎾 Play to increase happiness
  - 😴 Let them sleep to restore energy
  - 🧼 Keep them clean
  - 📚 Train to boost intelligence

- **Live Stats System**: Watch your pet's stats change in real-time
  - Hunger (decreases over time)
  - Happiness (decreases over time)
  - Energy (decreases over time)
  - Intelligence (grows with training)
  - Growth Level (increases with age)

- **Chat Interface**: Talk with your pet! They respond based on their mood and needs
- **Auto-Save**: Your pet data is automatically saved to browser storage
- **Isometric 3D View**: View your pet's habitat
- **Pet Data Viewer**: Check detailed statistics about your pet

## 🎮 How to Play

1. **Start**: Open `index.html` in a web browser
2. **Create Pet**: Click "Enter Game" and answer the quiz questions
3. **Care for Pet**: Use the action buttons to maintain your pet's stats
4. **Chat**: Talk to your pet through the chat interface
5. **Monitor**: Keep an eye on the stats - they decrease over time!
6. **Grow**: Watch your pet grow through 10 levels as time passes

## 🚀 Quick Start

Simply open `index.html` in any modern web browser. No installation or build process required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Start a local server (recommended)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 📁 Project Structure

```
cyber-pet-habitat/
├── index.html          # Main game file
├── scripts.js          # Game logic and interactions
├── styles.css          # Windows 98-inspired styling
├── digital-pet-simulation/  # React version (alternative implementation)
└── pet-game/           # Additional game assets
```

## 🎨 Design

The game features a nostalgic Windows 98 aesthetic with:
- Classic button styling with beveled edges
- Teal desktop background
- Retro scrollbars
- MS Sans Serif font
- Inset panels and borders

## 💾 Save System

Your pet data is automatically saved to browser's localStorage, including:
- Pet type and name
- All stats (hunger, happiness, energy, etc.)
- Age and growth level
- Creation date

To start over with a new pet, use the "Start New Pet" button on the main menu.

## 🔧 Technical Details

- **Pure Vanilla JavaScript**: No frameworks required
- **HTML5 Canvas**: For 3D habitat view
- **LocalStorage API**: For save/load functionality
- **CSS3 Animations**: Pet bouncing animation
- **Responsive Design**: Works on desktop and mobile

## 🎯 Game Mechanics

- Stats decay rates (per second):
  - Hunger: -0.5
  - Happiness: -0.3
  - Energy: -0.2
  - Cleanliness: -0.1

- Growth system:
  - 1 level per 5 minutes (300 seconds)
  - Maximum level: 10

- Stat ranges: 0-100%
  - Green: 60-100 (Good)
  - Orange: 30-59 (Warning)
  - Red: 0-29 (Critical)

## 🤖 Pet Personality

Your pet's responses in chat depend on:
- Current mood (happy/okay/sad)
- Stat levels
- Keywords in your messages

They'll let you know when they need attention!

## 🐛 Troubleshooting

**Pet not appearing?**
- Make sure you completed the quiz
- Check browser console for errors
- Try refreshing the page

**Stats not updating?**
- Ensure JavaScript is enabled
- Check if localStorage is available
- Try a different browser

**Want to reset?**
- Click "Start New Pet" on main menu
- Or clear browser localStorage

## 📝 License

MIT License - Feel free to use and modify!

## 🎉 Credits

Created as a nostalgic tribute to virtual pet games of the 90s and early 2000s.

---

**Enjoy caring for your Cyber Pet!** 🐾

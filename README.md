# ⏰ Time Saver

A modern, professional React scheduling application designed for efficient daily time management. Time Saver provides a clean, intuitive interface for organizing your schedule with precision and style.

## 🌟 Features

### Clean Timeline Interface
- **24-Hour Timeline**: Visual representation of your entire day with hourly slots
- **Color-Coded Slots**: Gray for available time slots, blue for occupied slots
- **Responsive Design**: Adapts perfectly to desktop and mobile devices
- **Professional UI**: Modern, business-appropriate design with minimal clutter

### Smart Event Management
- **Quick Event Creation**: Click any time slot to add events instantly
- **Event Editing**: Modify existing events with ease
- **Event Completion**: Mark events as completed for better tracking
- **Persistent Storage**: All events automatically saved to browser storage

### Todo Integration
- **Hourly Todos**: Add todos to specific time slots
- **Todo Completion**: Check off completed tasks
- **Visual Organization**: Clear distinction between pending and completed items

### Responsive Layout
- **Desktop**: Single row of 24 time slots with aligned hour labels
- **Mobile**: Two-row layout (12 AM-11 AM, 12 PM-11 PM) for optimal viewing
- **Perfect Alignment**: Hour labels perfectly positioned above their corresponding slots

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Time saver"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the app

## 📱 How to Use

### Adding Events
1. Click on any time slot in the timeline
2. Fill in the event details in the modal
3. Set the duration and description
4. Click "Add Event" to save

### Managing Events
- **Edit**: Click on a blue (occupied) slot to modify the event
- **Complete**: Mark events as completed using the checkbox
- **Delete**: Remove events using the delete button in the edit modal

### Date Navigation
- Use the date picker to jump to any date
- Navigate between dates using the arrow buttons
- Today's date is highlighted for quick reference

### Adding Todos
- Click the "+" button in any time slot's todo section
- Add quick tasks associated with specific hours
- Check off completed todos for better organization

## 🎨 Design Philosophy

Time Saver follows a **minimal, professional design approach**:

- **Clean Visual Hierarchy**: Clear distinction between different UI elements
- **Consistent Color Palette**: Professional blue and gray color scheme
- **No Visual Clutter**: Removed unnecessary icons, tooltips, and counters
- **Intuitive Interactions**: Simple click-to-add, drag-to-edit functionality
- **Responsive First**: Designed to work perfectly on all screen sizes

## 💾 Data Storage

- **Local Storage**: All events and todos are automatically saved to browser storage
- **Persistent Data**: Your schedule persists between browser sessions
- **No Backend Required**: Fully client-side application

## 🛠️ Technology Stack

- **React**: Frontend framework for building the user interface
- **CSS3**: Modern styling with flexbox and grid layouts
- **Local Storage API**: Browser-based data persistence
- **Responsive Design**: Mobile-first approach with media queries

## 📁 Project Structure

```
Time saver/
├── src/
│   ├── components/
│   │   ├── AddEventModal.jsx      # Event creation/editing modal
│   │   ├── DateHeader.jsx         # Date navigation component
│   │   └── TimelineSlots.jsx      # Main timeline display
│   ├── pages/
│   │   └── SchedulePage.jsx       # Main application page
│   ├── index.css                  # Global styles and utilities
│   └── App.js                     # Root application component
├── public/
└── README.md
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📋 Browser Support

Time Saver supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🚀 Future Enhancements

- **Calendar Integration**: Sync with Google Calendar, Outlook
- **Recurring Events**: Support for repeating events
- **Time Tracking**: Automatic time tracking for events
- **Export Functionality**: Export schedules to PDF or CSV
- **Team Collaboration**: Share schedules with team members
- **Dark Mode**: Toggle between light and dark themes
- **Notification System**: Reminders and alerts for upcoming events

---

**Built with ❤️ for better time management**

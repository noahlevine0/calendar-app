import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [view, setView] = useState('month') // Month / Week / Day view
  const [currentDate, setCurrentDate] = useState(new Date()) // Current date
  const [events, setEvents] = useState([]) // Events for the current date (comes from API)
  const [tasks, setTasks] = useState([]) // Tasks for the current date (comes from API)
  const [loading, setLoading] = useState(false) // State from API calls

  useEffect(() => {
    // Replace with actual API calls eventually

  }, [currentDate])

  // ======================================
  // NAVIGATION METHODS

  const nextDate = () => {  
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7)
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }
  const prevDate = () => {
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7)
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }
  const today = () => {
    setCurrentDate(new Date())
  }
  // ======================================
  // CALENDAR VIEW RENDERING
  const renderCalendarView = () => { // Render the proper calendar view
    if (loading) {
      return<div>Loading...</div>
    }
    switch (view) {
      case 'day':
        return <DayView date = {currentDate} events = {events} tasks = {tasks} />
      case 'week':
        return <WeekView date = {currentDate} events = {events} tasks = {tasks} />
      case 'month':
        return <MonthView date = {currentDate} events = {events} tasks = {tasks} />
      default:
        return <div>Invalid view</div>
    }
  }
  // ======================================
  // VIEW COMPONENTS 
  const DayView = ({ date, events, tasks }) => ( // Displaying one day
    <div className="day-view">
    {
      // TODO: DayView should have: 
      // Timeline for each hour of day (for drag and drop)
      // Events displayed in time slots
      // Tasks displayed based on due time
    }
    <div>Day View Placeholder for {date.toDateString()}</div>
    </div>
  )
  const WeekView = ({ date, events, tasks }) => ( // Displaying one week
    <div className="week-view">
    {
      // TODO: WeekView should have: 
      // Columns for each day of the week
      // Rows for hours in the days 
      // Events displayed in appropriate day + time slots
      // Tasks displayed on the respective due dates
    }
    <div>Week View Placeholder starting {date.toDateString()}</div>
    </div>
  )
  const MonthView = ({ date, events, tasks }) => ( // Displaying one month
    <div className="month-view">
    {
      // TODO: MonthView should have: 
      // 2D array of days (7 columns)
      // Correct number of rows based on the month
      // Current day highlighted / bolded??
    }
    <div>Month View Placeholder for {date.toLocaleString('default', {month: 'long',  year: 'numeric'})}</div>
    </div>
  )
    // ======================================
    // FUNCTIONS FOR TASK HANDLING
    const toggleTaskCompletion = (taskId) => { // Find task with matching ID, toggle completion status, update array
      setTasks(tasks.map(task => task.id === taskId ? {...task, completed: !task.completed} : task))
    }
    const addTask = (task) => { // Add task to array
      setTasks([...tasks, task])
    }
    // ======================================
    // FUNCTIONS FOR EVENT HANDLING
    const addEvent = (event) => { // Add event to array
      setEvents([...events, event])
    }
    // ======================================
    // FUNCTIONS FOR DRAG AND DROP FOR TASKS / EVENTS
    const handleDragStart = (e, item) => { // Drag an item
      // TODO: Implement drag start functionalitys
    }
    const handleDragOver = (e, date, hour) => {
      // TODO: Implement drag over functionalitys
      e.preventDefault()
    }
    const handleDrop = (e, date, hour) => {
      // TODO: Implement drop functionalitys
      e.preventDefault()
    }

    // ======================================
    // MAIN APP LAYOUT
    return (
      <div className="app-container">
        {/* HEADER IS HERE */}
        <header className="app-header">
          <h1>Student Smart Calendar</h1>
          
          {/* View selection buttons */}
          <div className="view-controls">
            <button onClick={() => setView('day')} className={view === 'day' ? 'active' : ''}>Day</button>
            <button onClick={() => setView('week')} className={view === 'week' ? 'active' : ''}>Week</button>
            <button onClick={() => setView('month')} className={view === 'month' ? 'active' : ''}>Month</button>
          </div>
          
          {/* Date navigation controls */}
          <div className="date-controls">
            <button onClick={prevDate}>Previous</button>
            <button onClick={today}>Today</button>
            <button onClick={nextDate}>Next</button>
            <span className="current-date">
              {/* TODO: Format date based on current view */}
              {currentDate.toDateString()}
            </span>
          </div>
        </header>
  

    {/* Main Calendar View */}
          {/* MAIN CONTENT */}
          <main className="app-content">
          {/* SIDE PANEL?? */}
          <div className="side-panel">
            {/* TASK PANEL */}
            <div className="tasks-panel">
              <h2>Tasks</h2>
              <div className="task-list">
                {/* 
                TODO: Implement task list with:
                1. Checkboxes/Button to mark completion
                2. Due dates for tasks
                3. Make it Drag and Droppable
                4. Color code by type??
                */}
                {tasks.map(task => (
                  <div key={task.id} className="task-item">
                    <input 
                      type="checkbox" 
                      checked={task.completed || false} 
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <div className="task-info">
                      <div className="task-title">{task.title}</div>
                      <div className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="add-task-btn">+ Add Task</button>
            </div>
            
            {/* Sleep Schedule Panel */}
            <div className="sleep-panel">
              <h2>Sleep Schedule</h2>
              <div className="sleep-info">
                {/* 
                TODO: Implement sleep schedule with: (based on information)
                1. Calculated wake-up time 
                2. Calculated bedtime
                3. Sleep duration
                4. Stats based on productivity algorithm
                */}
                <p>Recommended wake up: <strong>7:30 AM</strong></p>
                <p>Recommended bedtime: <strong>11:30 PM</strong></p>
                <p>Sleep duration: <strong>8 hours</strong></p>
              </div>
            </div>
          </div>
          
          {/* Calendar Area */}
          <div className="calendar-container">
            {/* Render day, week, or month view based on current state */}
            {renderCalendarView()}
          </div>
        </main>
        
        {/* Dialog Boxes */}
        {/* 
        TODO: Implement DB's for:
        1. Adding/editing tasks / events
        2. Viewing task / event details
        3. Setting user preferences
        */}
      </div>
    )
  }
  
  export default App
